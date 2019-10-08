# Configuration Files
Git has 3 levels of configuration files:

Level | Option | Priority
---|---|---
Repository specific | --local | 1
User specific | --global | 2
System wide | --system | 3


In a Windows environment these configuration files are usually located at:

Option | Location
---|---
--local | .git/config (inside the repository)
--global | ~/.gitconfig
--system | /etc/gitconfig

Configuration files are loaded in the following order. Any file loaded later in the order can overwrite values set earlier if the newer (loaded later) configuration file has the same key but a different value.

Level | Option | Loaded
---|---|---
Repository specific | --local | 3rd
User specific | --global | 2nd
System wide | --system | 1st

## Example Commands

**View config file:**<br>
git config \<option\> --list

**View all configurations:**<br>
git config --list

**Create & edit config file:**<br>
git config \<option\> user.name \<username\><br>
git config \<option\> user.email \<email\>

NOTE: To create a config file for a local repository you must create (initialize) the repository first.
