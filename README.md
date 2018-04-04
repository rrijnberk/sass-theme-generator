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