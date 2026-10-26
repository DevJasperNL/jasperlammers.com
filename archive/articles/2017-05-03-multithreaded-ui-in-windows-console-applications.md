---
title: "Multithreaded UI in Windows Console Applications"
published: "2017-05-03"
platform: "CodeProject"
originalUrl: "https://www.codeproject.com/Articles/1184633/Multithreaded-UI-in-Windows-Console-Applications"
waybackUrl: "https://web.archive.org/web/20170504104037/https://www.codeproject.com/Articles/1184633/Multithreaded-UI-in-Windows-Console-Applications"
firstCaptured: "2017-05-04"
lastCaptured: "https://web.archive.org/web/20250607084313/https://www.codeproject.com/Articles/1184633/Multithreaded-UI-in-Windows-Console-Applications"
source: "backup/codeproject/1184633-Multithreaded-UI-in-Windows-Console-Applications.html"
---

-   [Download MultithreadedConsole.zip - 36.9 KB](./downloads/2017-05-03-multithreaded-ui-in-windows-console-applications/MultithreadedConsole.zip)

## Introduction

MultithreadedConsole is a solution that can help a programmer to easily implement a multithreaded UI in a Windows Console Application.

## Background

Recently, I was working on a multithreaded implementation that needed some very simple user input. I decided that a Windows Console application would be sufficient for this.

As time went by, and the project grew I wanted to show the user some feedback about the inner happenings of the application. I created some events, and used `Console.WriteLine` to show the data.

This worked fine until the user decided to input a command in the console. As you have probably already guessed, this doesn't work very well when multithreading. The user input get complimented with the text printed on the second thread, after which a new line empty line is started:

![](./images/2017-05-03-multithreaded-ui-in-windows-console-applications/MultiThreadedConsoleProblem.gif)

After some more Googling, I didn’t find any simple to use solution for this problem and I decided to write my own. I want to share my solution with the community.

To me, the best solution seemed to prepend the text from the other thread before the user line. This requires storing user input, then overwriting that input when another thread is writing, and restoring the user input on the next line.

This might sound simple enough, but having some experience writing [this article](https://www.codeproject.com/Articles/1189696/Customizing-Windows-Console-Application-Key-Action), I knew it was not. The problem lies with intercepting user input. While this is possible using `Console.ReadKey`, it also disables features like scrolling through previous commands with the arrow keys. The before mentioned article tackles this problem, so I could reuse it in this solution.

## Using the code

The library (attached) provides its own `ConsoleExt.WriteLine` method which is very similar to the `Console.WriteLine` method .NET provides. The difference is that the new method actually intercepts all input from the user, stores it, and then writes the line. This provides possibility to use the inputted information to, in this case, write it on a new line after the initial input gets overwritten.

The method that should be used by the information threads is called `ConsoleExt.PrependLine`. This method prepends a line before the user-input line of the console.

Let's move on to an example:

```
private static bool _running = true;

static void Main(string[] args)
{
    Thread eventThread = new Thread(ThreadMethod);
    eventThread.Start();
    while (_running)
    {
        var line = ConsoleExt.ReadLine();
        // ..
    }
}

static void ThreadMethod()
{
    while (_running)
    {
        for (int i = 0; i < 40; i++)
        {
            if (!_running)
                return;
            Thread.Sleep(100);
        }
        ConsoleExt.PrependLine("This is an event on a different thread!");
    }
}
```

This example simulates an event on a different thread every 4 seconds. Instead of using the `WriteLine` method, `PrependLine` is used. The result will be as seen below:

![](./images/2017-05-03-multithreaded-ui-in-windows-console-applications/MultiThreadedConsoleSolution.gif)

There you have it. A solution that is easy to use, but saves a lot of frustration. For both the programmer and the user.

## Points of Interest

The solution is thread safe. Multiple threads can call `ConsoleExt.PrependLine`.

When I was looking for solutions to this problem, I did find that other people encountered the same problem. This were mainly cases of implementing a console chat application. This solution could be used for such a case as well.

Of course it is also quite easy to use `Console.CursorLeft` and `Console.CursorTop` to overwrite a line in case of loading something in a different thread. However, the goal of this article is demonstrating an easy and reusable way of using a console application with multiple threads. (Think about the chat example).

I haven’t implemented all default console functionality. If you have any good additions, feel free to message me, and I might add them to the project.

`ConsoleExt` supports more useful console methods. [This article](https://www.codeproject.com/Articles/1182358/Using-Autocomplete-in-Windows-Console-Applications) has more details about these.

Little disclaimer for the purists: Even though I am all about writing clean code, the `ConsoleExt` class contains a huge `switch` statement. After many sleepless nights, I deliberately left it this way. In my opinion, splitting it up into smaller parts would actually reduce the readability of the code.

## History

##### 03-05-2017 - Version 1

##### 19-08-2017 - Version 1.1

-   Refactored `ConsoleExt` to allow for a lot more unit testing and implemented those unit tests.
