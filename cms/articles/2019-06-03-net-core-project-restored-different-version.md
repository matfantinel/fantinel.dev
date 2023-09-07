---
slug: net-core-project-restored-different-version
title: .NET Core - Project version mismatch
excerpt: Solving this cryptic error might take you many hours. Hopefully this will help you out.
coverImage: /posts/net-core-project-restored-different-version/cover.jpg
coverImageAlt: ""
showImage: false
date: 2019-06-03
updated: null
hidden: false
tags: []
categories:
  - Back-End
  - Dev
type: Article
---

This problem usually happens when you're working on a solution with multiple projects that were created using different versions of the .NET SDK.

> !!! error
> The project was restored using Microsoft.NETCore.App version x.x.x, but with current settings, version y.y.y would be used instead

You may encounter this error when running `dotnet build` or maybe only on `dotnet publish`. In any case, the best way to get rid of this problem for good is the following:

1. On the folder where your `.sln` file resides, create a new file named `Directory.Build.props`. If you're not working with a solution (not using Visual Studio), you can use create it on the root directory of your repository (usually where `.gitignore` is;
2. With a text editor, add the following content to it:

```xml
~filename Directory.Build.props
<Project>
  <PropertyGroup>
    <TargetLatestRuntimePatch>true</TargetLatestRuntimePatch>
    <GenerateFullPaths>true</GenerateFullPaths>
    <LangVersion>latest</LangVersion>
  </PropertyGroup>
</Project>
```

What these properties do is make your projects always restore and compile using the latest version available.

Try running the command again. If all went right, it should be compiling successfully now!

> !!! info
> In case it doesn't work for you, you can add these lines manually on each of the `.csproj` files.

Thanks for reading!
