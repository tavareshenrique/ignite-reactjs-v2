-- DropForeignKey
ALTER TABLE `UserTimeInterval` DROP FOREIGN KEY `UserTimeInterval_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedulings` DROP FOREIGN KEY `schedulings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- RenameIndex
ALTER TABLE `UserTimeInterval` RENAME INDEX `UserTimeInterval_user_id_fkey` TO `UserTimeInterval_user_id_idx`;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `accounts_user_id_idx`;

-- RenameIndex
ALTER TABLE `schedulings` RENAME INDEX `schedulings_user_id_fkey` TO `schedulings_user_id_idx`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `sessions_user_id_fkey` TO `sessions_user_id_idx`;
