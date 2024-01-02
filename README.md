# Filament EditorJs

![Filament EditorJs](art/banner.png)
[![Latest Version on Packagist](https://img.shields.io/packagist/v/mrfade/filament-editorjs.svg?style=flat-square)](https://packagist.org/packages/mrfade/filament-editorjs)
[![Total Downloads](https://img.shields.io/packagist/dt/mrfade/filament-editorjs.svg?style=flat-square)](https://packagist.org/packages/mrfade/filament-editorjs)

[EditorJs](https://editorjs.io/) integration for Filament Admin/Forms.

## Installation

You can install the package via composer:

```bash
composer require mrfade/filament-editorjs
```

## Usage

```php
use FilamentEditorJs\Forms\Components\EditorJs;

EditorJs::make('content')

```

## Customization

### Tools

By default all tools are enabled. This is a list of available tools:

```php
[
    'attaches',
    'checklist',
    'code',
    'delimiter',
    'header',
    'image-gallery',
    'image',
    'inline-code',
    'link',
    'list',
    'marker',
    'nested-list',
    'paragraph',
    'quote',
    'raw',
    'style',
    'table',
    'underline',
    'warning',
]
```

You can disable any of them using by passing an array of tool names:

```php
EditorJs::make('content')
    ->disableTools(['image', 'raw']);
```

Also you can enable only certain tools:

```php
EditorJs::make('content')
    ->tools(['image', 'raw']);
```

### Tools Options
You can pass options to the tools:

```php
EditorJs::make('content')
    ->toolsOptions([
        'attaches' => [
            'endpoint' => '/upload/file',
        ],
        'image' => [
            'endpoints' => [
                'byFile' => '/upload/image',
                'byUrl' => '/upload/image-by-url',
            ],
        ],
    ]);
```

### Debugging
To debug the editor, you can enable the debug mode:

```php
EditorJs::make('content')
    ->debug();
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](https://github.com/spatie/.github/blob/main/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
