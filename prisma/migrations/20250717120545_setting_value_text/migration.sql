-- AlterTable
ALTER TABLE `setting` MODIFY `value` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `CareerApplication` ADD CONSTRAINT `CareerApplication_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `Career`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WaveToWavePlaylist` ADD CONSTRAINT `_WaveToWavePlaylist_A_fkey` FOREIGN KEY (`A`) REFERENCES `Wave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WaveToWavePlaylist` ADD CONSTRAINT `_WaveToWavePlaylist_B_fkey` FOREIGN KEY (`B`) REFERENCES `WavePlaylist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
