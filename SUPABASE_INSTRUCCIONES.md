# Configuración de Supabase para vídeos de Animación

## 1. Crear proyecto en Supabase

1. Entra en [supabase.com](https://supabase.com) e inicia sesión
2. Crea un nuevo proyecto (o usa uno existente)
3. Espera a que el proyecto esté listo

## 2. Ejecutar el SQL

1. En el Dashboard de Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia todo el contenido de `supabase-setup.sql`
4. Pégalo en el editor y haz clic en **Run**
5. Verifica que no haya errores

## 3. Configurar las credenciales

1. Copia `public/supabase-config.example.js` como `public/supabase-config.js`
2. Ve a Supabase **Settings** > **API**
3. Copia la **Project URL** y la **anon public** key
4. Edita `public/supabase-config.js` y pega los valores:

```js
window.SUPABASE_URL = 'https://tu-proyecto.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGc...tu_key_completa';
```

## 4. Listo

Al subir un vídeo en la página de Animación, se guardará en Supabase y se mostrará aunque recargues la página.
