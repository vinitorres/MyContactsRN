# Internacionalização (i18n)

Este projeto suporta múltiplos idiomas usando `i18next` e `react-i18next`.

## Idiomas Suportados

- **Português (Brasil)** - `pt-BR` (padrão para dispositivos em português)
- **Inglês** - `en` (idioma de fallback)

## Como Funciona

O aplicativo detecta automaticamente o idioma do dispositivo usando `expo-localization` e carrega as traduções apropriadas. Se o idioma do dispositivo não for suportado, o aplicativo usa inglês como padrão.

## Estrutura de Arquivos

```
src/i18n/
├── config.ts          # Configuração do i18next
├── index.ts           # Exportações
└── locales/
    ├── en.json        # Traduções em inglês
    └── pt-BR.json     # Traduções em português
```

## Como Usar nas Telas

1. Importe o hook `useTranslation` do `react-i18next`:

```tsx
import { useTranslation } from 'react-i18next';
```

2. Use o hook no componente:

```tsx
export function MyScreen() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('contacts.title')}</Text>
  );
}
```

## Adicionar Novas Traduções

1. Adicione a chave e o texto em `src/i18n/locales/en.json`:

```json
{
  "mySection": {
    "myKey": "My text in English"
  }
}
```

2. Adicione a mesma chave em `src/i18n/locales/pt-BR.json`:

```json
{
  "mySection": {
    "myKey": "Meu texto em português"
  }
}
```

3. Use no código:

```tsx
<Text>{t('mySection.myKey')}</Text>
```

## Adicionar Novo Idioma

1. Crie um novo arquivo JSON em `src/i18n/locales/`, por exemplo `es.json` para espanhol
2. Adicione todas as traduções nesse arquivo
3. Importe e adicione ao objeto `resources` em `src/i18n/config.ts`:

```typescript
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  'pt-BR': { translation: ptBR },
  es: { translation: es },
};
```

## Interpolação

Você pode usar variáveis nas traduções:

```json
{
  "welcome": "Olá, {{name}}!"
}
```

```tsx
<Text>{t('welcome', { name: 'João' })}</Text>
// Resultado: "Olá, João!"
```

## Pluralização

Para textos que mudam com base em quantidade:

```json
{
  "items_one": "{{count}} item",
  "items_other": "{{count}} itens"
}
```

```tsx
<Text>{t('items', { count: 1 })}</Text>  // "1 item"
<Text>{t('items', { count: 5 })}</Text>  // "5 itens"
```
