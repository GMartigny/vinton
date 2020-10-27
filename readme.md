# Vinton

![Vinton logo](./media/logo.png)

Vinton is a JS projects manager. It runs pluggable checks against your projects workspace and shows a clear health status.


## Installation

    npm install -g vinton


## Plugins

Vinton is build around plugins. It means that you can add any compatible Vinton plugins to your checklist.

If you want to create a new plugin, please follow the examples and tell us about it.


## Usage

    cd /workspace
    vinton

### Commands

#### init

    vinton init

This will create a new empty configuration file.

#### help

    vinton help

Display informations about the CLI and the possible commands.

#### version

    vinton version

Display the current vinton version.

#### add

    vinton add <plugin> <plugin> ...

Install plugins and add them to the configuration file.

alias: `install`

#### remove

    vinton remove <plugin> <plugin> ...

Uninstall plugins and remove them from the configuration file.

alias: `rm`, `uninstall`


## Vinton for enterprise

Available as part of the Tidelift Subscription.

The maintainers of Vinton and thousands of other packages are working with Tidelift to deliver commercial
support and maintenance for the open source packages you use to build your applications. Save time, reduce risk,
and improve code health, while paying the maintainers of the exact packages you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-vinton?utm_source=undefined&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)


## License

[MIT](license)
