-- CreateTable
CREATE TABLE `Libro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `autor` VARCHAR(255) NOT NULL,
    `resumen` VARCHAR(500) NOT NULL,
    `anio_publicacion` INTEGER NOT NULL,
    `imagen` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `usuario` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `rol` VARCHAR(255) NOT NULL DEFAULT 'usuario',

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ListaDeseados` (
    `id_lista_deseados` INTEGER NOT NULL AUTO_INCREMENT,
    `id_libro` INTEGER NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ListaDeseados_id_libro_id_usuario_key`(`id_libro`, `id_usuario`),
    PRIMARY KEY (`id_lista_deseados`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ListaDeseados` ADD CONSTRAINT `ListaDeseados_id_libro_fkey` FOREIGN KEY (`id_libro`) REFERENCES `Libro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListaDeseados` ADD CONSTRAINT `ListaDeseados_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
