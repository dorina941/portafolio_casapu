-- Tabla para guardar los vídeos de animación
CREATE TABLE IF NOT EXISTS animacion_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_number INT NOT NULL UNIQUE CHECK (slot_number >= 1 AND slot_number <= 6),
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permitir lectura pública (cualquiera puede ver los vídeos)
ALTER TABLE animacion_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura pública de animacion_videos"
    ON animacion_videos FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserción y actualización pública"
    ON animacion_videos FOR ALL
    USING (true)
    WITH CHECK (true);

-- ========== STORAGE: Bucket y políticas ==========
-- Crear bucket público para vídeos
INSERT INTO storage.buckets (id, name, public)
VALUES ('animacion-videos', 'animacion-videos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Permitir subir vídeos (cualquiera puede subir)
CREATE POLICY "Permitir subir videos animacion"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'animacion-videos');

-- Permitir leer vídeos (cualquiera puede ver)
CREATE POLICY "Permitir leer videos animacion"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'animacion-videos');

-- Permitir actualizar/borrar (para reemplazar vídeos)
CREATE POLICY "Permitir actualizar videos animacion"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'animacion-videos');

CREATE POLICY "Permitir borrar videos animacion"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'animacion-videos');
