"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { PropertyInput } from "@/app/api/types";
import { PropertySchema } from "@/schemas/property.schema";
import { useAddProperty } from "@/app/api-client/property/useAddProperty";
import { AxiosError } from "axios";
import { CustomError } from "@/app/api/helpers/handleError";
import { propertyTypes } from "@/data/propertyTypes";

export const AddPropertyForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<{ url: string }[]>([]);

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyInput>({
    mode: "onSubmit",
    resolver: zodResolver(PropertySchema),
  });

  const { mutateAsync: addProperty } = useAddProperty({
    invalidateQueryKey: [],
  });

  const handleFormSubmit = async (values: PropertyInput) => {
    try {
      if (images.length === 0) {
        setError("title", { message: "Please add at least one image URL" });
        return;
      }

      const propertyData = {
        ...values,
        PropertyImage: images.map((img, index) => ({
          url: img.url,
          order: index + 1,
          thumbnail: index === 0,
        })),
      };

      await addProperty({ body: propertyData });
      reset();
      setImages([]);
      router.push("/");
    } catch (error) {
      const err = error as AxiosError;
      const errObject = err.response?.data as CustomError;
      const message = errObject?.error?.message || "Something went wrong";
      setError("title", { message });
    }
  };

  return (
    <div className="flex justify-center py-12 px-4 min-h-screen">
      <div className="max-w-3xl w-full p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Add New Property</h2>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details to create your property listing
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-6">
          {/* Title */}
          <Input
            placeholder="Property Title"
            {...register("title")}
            error={errors.title?.message}
          />

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">
              Description
            </label>
            <textarea
              placeholder="Property Description"
              {...register("description")}
              className="border rounded-lg p-3 focus:ring focus:ring-indigo-200"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Address */}
          <Input
            placeholder="Property Address"
            {...register("address")}
            error={errors.address?.message}
          />

          {/* Price */}
          <Input
            placeholder="Property Price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            error={errors.price?.message}
          />

          {/* Property Type */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">
              Property Type
            </label>
            <select
              {...register("type")}
              className="border rounded-lg p-3 focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Property Images (URLs) */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">
              Property Images (URLs)
            </label>
            {images.map((img, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Enter Image ${index + 1} URL`}
                  value={img.url}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[index].url = e.target.value;
                    setImages(newImages);
                  }}
                  className="border rounded-lg p-2 flex-1 focus:ring focus:ring-indigo-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="bg-gradient-to-bl from-gray-500 to-pink-500 text-white px-3 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setImages([...images, { url: "" }])}
              className="mt-2  text-Black border-2 px-4 py-2 rounded-lg"
            >
              Add Image URL
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Button loading={isSubmitting}>Add Property</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
