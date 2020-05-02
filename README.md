# d2s-cli

Diablo II d2s file command line editor

暗黑破坏神2 d2s 文件修改命令行工具

## Environment

Diablo II v1.13 ~ v1.14

## Installation

安装

```bash
$ npm i -g d2s-cli
```

Or

```bash
$ yarn global add d2s-cli
```

## Reset stats & skill points

You can reset stats & skill points through Akara in normal Act 1. Make sure you've completed the Den of Evil first.

重置技能点，执行下面命令后即会重置资料片第一幕阿卡拉洗点任务，确保你首先完成了邪恶巢穴的任务。

```text
$ d2s reset
 ___    ___   ___      ___   _      ___ 
|   \  |_  ) / __|    / __| | |    |_ _|
| |) |  / /  \__ \   | (__  | |__   | | 
|___/  /___| |___/    \___| |____| |___|   v0.1.0
                                          
? Select your hero LeBlanc

[D2S] Done.
[D2S][WRAN] You can reset stats & skill points through Akara in normal Act 1.
[D2S][WRAN] Make sure you've completed the Den of Evil first.
```

Or you can specify a d2s file like: 

或者你可以像这样指定某个 `d2s` 文件：

```bash
$ d2s reset "/Applications/Diablo II/Save/LeBlanc.d2s"
```