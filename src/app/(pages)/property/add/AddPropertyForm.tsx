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
  const [images, setImages] = useState<File[]>([]);

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
      const propertyData = {
        ...values,
        PropertyImage: images.map((file, index) => ({
          url: URL.createObjectURL(file),
          order: index + 1,
          thumbnail: index === 0,
        })),
      };

      await addProperty({ body: propertyData });
      reset();
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

          {/* Property Images */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">
              Property Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setImages(e.target.files ? Array.from(e.target.files) : [])
              }
              className="border rounded-lg p-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Button loading={isSubmitting}>Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
