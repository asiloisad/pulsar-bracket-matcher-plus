# bracket-matcher-plus

Highlight and jump between matching brackets and XML/HTML tags with autocomplete and selection support.

Fork of [bracket-matcher](https://github.com/pulsar-edit/pulsar/tree/master/packages/bracket-matcher).

## Features

- **Bracket highlighting**: Highlights the matching bracket pair adjacent to the cursor.
- **Tag highlighting**: Highlights matching XML/HTML tag name pairs.
- **Bracket autocomplete**: Auto-inserts the closing bracket when an opening bracket is typed.
- **Pair skip**: Skips over an existing closing bracket instead of inserting a duplicate.
- **Pair backspace**: Deletes both brackets of a pair on backspace.
- **Selection wrapping**: Wraps selected text in brackets when an opening bracket is typed.
- **Extra newline**: Inserts an extra indented line between a bracket pair on Enter.
- **Syntax tree support**: Uses tree-sitter for accurate matching when available.
- **Universal editor support**: Works in all registered text editors, not just workspace panes.
- **Scrollbar integration**: Exposes matched bracket positions via a service API, enabling [scrollmap-brackets](https://github.com/asiloisad/pulsar-scrollmap-brackets) to display them on the scrollbar.

## Installation

To install `bracket-matcher-plus` search for [bracket-matcher-plus](https://web.pulsar-edit.dev/packages/bracket-matcher-plus) in the Install pane of the Pulsar settings or run `ppm install bracket-matcher-plus`. Alternatively, you can run `ppm install asiloisad/pulsar-bracket-matcher-plus` to install a package directly from the GitHub repository.

## Commands

Commands available in `atom-text-editor`:

- `bracket-matcher-plus:go-to-matching-bracket`: jump to the matching bracket, or to the nearest enclosing bracket when none is adjacent,
- `bracket-matcher-plus:go-to-enclosing-bracket`: jump to the nearest enclosing bracket,
- `bracket-matcher-plus:select-inside-brackets`: select all text inside the current brackets,
- `bracket-matcher-plus:select-matching-brackets`: select both matching brackets,
- `bracket-matcher-plus:remove-brackets-from-selection`: remove the wrapping brackets from the selection,
- `bracket-matcher-plus:remove-matching-brackets`: remove the bracket pair adjacent to the cursor,
- `bracket-matcher-plus:close-tag`: insert a closing XML/HTML tag for the nearest unclosed tag.

## Scoped settings

Scope-specific overrides can be added to your `config.cson` and take precedence over both package defaults and global settings. This is useful for per-language bracket rules.

```cson
".source.rust":
  "bracket-matcher-plus":
    autocompleteCharacters: [
      "()"
      "[]"
      "{}"
      "<>"
      "\"\""
      "``"
    ]
```

## Customization

The bracket highlight style can be adjusted in the `styles.less` file:

- e.g. change highlight color:

```less
.bracket-matcher-plus .region {
  border-bottom-color: red !important;
}
```

## Provided Service `bracketMatcherPlus`

Exposes the currently highlighted bracket pair for any registered text editor. Useful for packages that need to know which brackets are matched at the cursor position.

In your `package.json`:

```json
{
  "consumedServices": {
    "bracketMatcherPlus": {
      "versions": {
        "1.0.0": "consumeBracketMatcherPlus"
      }
    }
  }
}
```

In your main module:

```javascript
consumeBracketMatcherPlus(service) {
  this.bracketService = service;
  return new Disposable(() => { this.bracketService = null; });
}
```

The service object exposes two methods:

- `getMatchRanges(editor)`: returns `{ range1, range2 }` with the buffer ranges of the currently highlighted bracket pair, or `null` when no pair is highlighted.
- `observe(callback)`: subscribes to match changes. The `callback(editor, ranges)` is called whenever the highlighted pair changes for any editor, with `ranges` being the same value as `getMatchRanges(editor)`. Returns a `Disposable`.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
