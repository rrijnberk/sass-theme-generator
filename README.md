# SASS Theme Generator
this project serves to support the easy creation of themes using sass variables and sources. As the variables are 
resolved prior to the sources it is not required to import them. It is important to note that all variables should be
defined in the variables and not among the sources.

## Install & Use
### Project level
To install the library at the project level use ```npm install sass-theme-generator``` and to generate the theme add 
'**sass-theme**' to a package.json script.

### Global level
To install the library at the global level use ```npm install -g sass-theme-generator``` and generate the theme by 
calling ```sass-theme``` in the project folder.


## The *theme.config.json* file
The config file for this library is used to override the default values for this plugin and has the following parameters
which can be set.

| parameter name | type | default value | description |
|:-------------- |:---- |:------------- |:----------- |
| name | string | theme | The root name for the theme files. Setting the name **my-company** would result in **my-company**.css, src/**my-company**_sources.scss & src/**my-company**_variables.scss |
| target | string | dist | The target directory for file storage. |
| sources | string[] | [] | The source files containing the implementation of the themes. These files use the variables as declared in the variables file. ***These files should not contain variables!*** |
| variables | string[] | [] | The files containing the variable declarations. ***These files should not contain implementations!*** |

## Configuration
Given the following directory structure:
```
/root
 |
 └──/src
     |
     ├──/constructs
     |   ├── _inputs.scss
     |   └── constructs.scss
     |
     ├──/theme
     |   ├── _page.scss
     |   └── theme.scss
     |
     └──/variables
         ├── _color.scss
         ├── _dimensions.scss
         ├── _display.scss
         └── variables.scss

```

And the required output:
```
/root
 |
 └──/target
     └──/src
     |   ├── royal_sources.scss
     |   └── royal_variables.scss
     └── royal.css
```

Then the **theme.config.json** would then look like:
```
{
  "variables": [
    "test/variables/variables.scss",
    "test/constructs/constructs.scss"
  ],
  "sources": ["test/theme.scss"],
  "target": "target",
  "name": "royal"
}
```

## Function comment support (1.1.x +)
To create more support for functional css with themes function comments allow the generation of functional classes.

The function comment delimiter is __//@fn__ which is followed by the variable declarations.
The pattern delimiter is __=>__ which is followed by the pattern where $0 refers to the first variable set, $1 to the second and so on.

> Be aware that each set of variables creates a subset of results. I.E. ```[ 1, 2 ][ A, B, C ]``` results in ```[[1A, 1B, 1C], [2A, 2B, 2C]]```  

If we add a function comment like:
```scss
//@fn [ top, right, bottom, left][ xs, s, n, l, xl] => .margin-$0-$1 { margin-$0: $tier__spacing--$1; }
```

This would result in the comment being substituted by:
```scss
.margin-top-xs { margin-top: tier__spacing--xs; }
.margin-top-s { margin-top: tier__spacing--s; }
.margin-top-n { margin-top: tier__spacing--n; }
.margin-top-l { margin-top: tier__spacing--l; }
.margin-top-xl { margin-top: tier__spacing--xl; }
.margin-right-xs { margin-right: tier__spacing--xs; }
.margin-right-s { margin-right: tier__spacing--s; }
.margin-right-n { margin-right: tier__spacing--n; }
.margin-right-l { margin-right: tier__spacing--l; }
.margin-right-xl { margin-right: tier__spacing--xl; }
.margin-bottom-xs { margin-bottom: tier__spacing--xs; }
.margin-bottom-s { margin-bottom: tier__spacing--s; }
.margin-bottom-n { margin-bottom: tier__spacing--n; }
.margin-bottom-l { margin-bottom: tier__spacing--l; }
.margin-bottom-xl { margin-bottom: tier__spacing--xl; }
.margin-left-xs { margin-left: tier__spacing--xs; }
.margin-left-s { margin-left: tier__spacing--s; }
.margin-left-n { margin-left: tier__spacing--n; }
.margin-left-l { margin-left: tier__spacing--l; }
.margin-left-xl { margin-left: tier__spacing--xl; }
```
