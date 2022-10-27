git ## 从远程仓库获取所有分支

```shell
git clone xxx
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --all
git pull --all
```

## 撤销修改

- 修改了某个文件，但没有添加到暂存区

```shell
git checkout -- file
```

- 将修改的文件添加到暂存区
  1.
  ```shell
  git reset HEAD <file>
  ```
  2. 这样就回到上面的那种场景了
  ```shell
  git checkout -- file
  ```
- 如果已经提交到了版本库，可以直接使用版本回退，回退到上一个版本

## 版本回退

当文件被`commit`仓库后，使用版本回退来还原原来的文件

```shell
  git reset --hard <commit_id>
```

使用`soft`参数可以不改变当前文件修改的情况下回退的上一个版本，用于修改`commit` 信息很好用

```shell
  git reset --soft <commit_id>
```

使用穿梭前，用`git log` 或 `git reflog` 查看提交历史，以便确定要回到哪个版本

## 储存现有状态（Bug 分支）

- 查看以储存的状态列表

```shell
git stash list
```

- 储存现有状态到储存状态列表中
  可以多次使用该命令来储存多个状态

```shell
git stash
```

- 恢复工作区到特定的储存状态

```shell
git stash apply <储存状态id>
# 比如：
git stash apply stash@{0}
```

- 恢复工作区到最后一个储存的状态,并在储存列表中删除一条储存记录

```shell
git stash pop
```

- 清空储存状态列表

```shell
git stash drop
```

- 将特定提交所做的修改“复制”到当前分支

```
git cherry-pick <提交id>
```

## 拉取远程分支到本地（三种方法）

- 直接拉取：
  ` git clone -b 远程分支名 仓库地址`

- 已有本地仓库创建新分支拉取

  1. 查看全程分支
     `git branch -r`

  2. 创建本地分支并关联
     `git checkout -b 本地分支 origin/远程分支`

- 已有本地分支关联

  1. 创建本地分支与远程分支的关联
     `git branch --set-upstream-to origin/远程分支名 本地分支名`

  2. 拉取远程分支代码
     `git pull`

## git 拉取远程分支到本地分支或者创建本地新分支

- `git fetch origin branchname:branchname`：可以把远程某各分支拉去到本地的 branchname 下，如果没有 branchname，则会在本地新建 branchname

- `git checkout --track origin/remoteName -b localName`：获取远程分支 remoteName 到本地新分支 localName，并跳到 localName 分支，这里加了--track，让创建的本地分支 localName 跟中远程的 origin/remoteName 分支。

- `git checkout -b XXX`：在当前分支的基础上创建新的分支，也就是说，当前分支和 XXX 分支都是指向同一个 commit 的。

## 将本地代码上传到远程仓库

- `git push -f origin master​​`：强制将本地代码上传到远程仓库
- `git push origin master:main`：将本地 master 分支上传到远程 main 分支
- `git push origin :main`：推送一个空分支到远程 main 分支

## 远程仓库分支

`git push origin --delete [branch_name]`：删除一个远程仓库分支
`git branch -r`：查看一个远程仓库分支
