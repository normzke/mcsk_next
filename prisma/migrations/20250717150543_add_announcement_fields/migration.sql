-- AlterTable
ALTER TABLE `announcement` ADD COLUMN `attachment` VARCHAR(191) NULL,
    ADD COLUMN `buttonText` VARCHAR(191) NULL,
    ADD COLUMN `buttonUrl` VARCHAR(191) NULL,
    ADD COLUMN `expireAt` DATETIME(3) NULL,
    ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `publishAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'info';
