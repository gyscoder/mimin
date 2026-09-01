# Mimin — 14 anos ❤️

Presente digital feito para a Mimin.

## Rodar

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado pelo Vite.

## Fotos

Coloque novas fotos em `public/photos/` e adicione entradas no array `PHOTOS` em `src/App.tsx`.

Exemplo:

```ts
{ src: "/photos/mimin-3.jpeg", alt: "Mimin", caption: "Olha ela 😌❤️" }
```

Não existe limite fixo de fotos; a galeria se adapta.

## Música

A surpresa usa o vídeo do YouTube informado no briefing:

`https://www.youtube.com/watch?v=1lrFsXkT_rM`

A reprodução é iniciada quando a caixa de presente é clicada, aproveitando a interação do usuário para evitar o bloqueio de autoplay dos navegadores.

Se preferir usar um arquivo de áudio próprio depois, substitua o iframe por um elemento `<audio>` e coloque o arquivo em `public/audio/`.

## Data

O alvo está configurado como `01/09/2026 00:00` no fuso `-03:00`. Depois dessa data, o site abre diretamente a experiência de aniversário.

## Personalização

- Foto principal: `Hero` em `src/App.tsx`
- Galeria: `PHOTOS`
- Música: `YOUTUBE_ID`
- Cores: variáveis no começo de `src/styles.css`
- Textos: componentes em `src/App.tsx`
