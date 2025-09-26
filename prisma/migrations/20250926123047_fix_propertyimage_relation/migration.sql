-- DropForeignKey
ALTER TABLE `propertyimage` DROP FOREIGN KEY `PropertyImage_propertyId_fkey`;

-- DropIndex
DROP INDEX `propertyId` ON `propertyimage`;

-- AddForeignKey
ALTER TABLE `PropertyImage` ADD CONSTRAINT `PropertyImage_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
