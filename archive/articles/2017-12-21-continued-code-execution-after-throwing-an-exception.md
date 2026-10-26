---
title: "Continued code execution after (throwing) an Exception"
published: "2017-12-21"
platform: "CodeProject"
originalUrl: "https://www.codeproject.com/Articles/1221904/Continued-code-execution-after-throwing-an-Excepti"
waybackUrl: "https://web.archive.org/web/20171222131044/https://www.codeproject.com/Articles/1221904/Continued-code-execution-after-throwing-an-Excepti"
firstCaptured: "2017-12-22"
lastCaptured: "https://web.archive.org/web/20250515073308/https://www.codeproject.com/Articles/1221904/Continued-code-execution-after-throwing-an-Excepti"
source: "backup/codeproject/1221904-Continued-code-execution-after-throwing-an-Excepti.html"
---

-   [Download ExceptionHandling.zip - 16.5 KB](https://cloudfront.codeproject.com/cs/1221904/exceptionhandling.zip)

###### *This solution is supposed to be a starting point. Since its implementation is simple, it can easily be altered to suit your needs.*

## Introduction

This article provides a method (and implementation) to easily toggle the way exceptions are being handled (either being thrown or handled by custom code), while still conserving the stack trace when exceptions are not being thrown.

## Background

Personally, I like to be very strict when I'm making a program. When writing a method, and I think of an execution path that makes no sense, or should not occur, I throw an exception. [Every thread has only one catch method in which the exception is handled.](https://www.codeproject.com/Articles/9538/Exception-Handling-Best-Practices-in-NET#Putasinglecatch%28Exceptionex%29perthread9)

This way, possible bugs are caught early, and are easy to resolve due to the data in the exception (exception type, message and stack trace).

This sounds great! But let's enter the real world...

Imagine working on a product with several developers using the method above. The product is starting to get larger and consists of multiple components. One day, you, or one of your colleagues has been a bit careless and committed some code without testing it properly. No problem: an exception pops up! However, this exception now pops up for everyone that is working on the product. Even developers working on an entirely different component will be blocked until this one exception is solved.

Of course, this is a very crude example, and exception handling can be done per component or class. But from my experience it can be very useful to toggle the way exceptions are handled depending on the people using it.

This article is about just that: toggling whether exceptions should be thrown, or handled in a different way.

## So...why not just log?

When I throw an exception, I do so because I cannot guarantee the stability of the program when a certain execution path occurs.

However, in projects where a team wants to avoid an application to crash on a single exception (see example in the [chapter above](#Background)), these exceptions might be caught on multiple locations (early on) and logged, or these kind of exceptions are replaced by logging altogether.

Replacing exceptions by logging doesn't have to be a bad thing. But in some cases, the application might not show any symptoms or problems when such an "exception" occurs. If this happens a lot, log files will be full of exceptions over time, making it increasingly difficult to find real problems.

On top of the above, logged (/ignored) "exceptions" might cause a program to become unstable over time. If the log is flooded with mundane exceptions as well, it will be very difficult to find the original cause of a bug caused this way.

## But...are exceptions (and stack traces) not slow?

Throwing exceptions and creating call stacks can be relatively slow. But that's why they should only be used in cases of...exception. The method I'm offering here doesn't mean you should turn of the throwing of exceptions altogether and ignore everything that is happening in your code as long as it still [seems to work](<#Seems to work>).

The purpose of this article/solution is to give developers the means to toggle between throwing exceptions and handling them in an alternative way, mainly during the development process. Every exception that occurs in the (released) code is still one to many,

## Using the code

### Throwing/Creating Exceptions

Instead of throwing exceptions, exceptions will go through a class called the `ExceptionHandler`. This class determines whether exceptions are thrown or should be handled by [custom code](#HandlingExceptions).

To prevent having to retrieve an `ExceptionHandler` object everywhere, the included library makes use of an extension method on the `Exception` class. Of course you are free to implement this part however you see fit.

```
private void Example()
{
    throw new NullReferenceException("This is an example");

    // Some logic
}
```

Will be replaced by:

```
private void Example()
{
    new NullReferenceException("This is an example").Handle();
    return;

    // Some logic
}
```

When the method has a return type, it's up to the developer what the method should return in an exceptional case. To make things easy, the `Handle<TReturn>` method allows the developer to provide a return value.

```
private int Example()
{
    throw new NullReferenceException("This is an example");

    // Some logic
}
```

Could be replaced by:

```
private const int ErrorValue = -1;

private int Example()
{
    new NullReferenceException("This is an example").Handle();
    return ErrorValue;

    // Some logic
}
```

Or by:

```
private const int ErrorValue = -1;

private int Example()
{
    return new NullReferenceException("This is an example").Handle(ErrorValue);

    // Some logic
}
```

### Handling Exceptions

When using exceptions as shown above, the way the developer wants to handle them can be manipulated in the `ExceptionHandler` class.

The `ExceptionHandler` is the subject of a basic observer pattern that allows observers of type `IUnthrownExceptionHandler` to register to it. If the property `ThrowExceptions` is set to `false`, the `Handle` method on all registered handlers is called as soon as the exception is passed to the `ExceptionHandler`.

```
public interface IUnthrownExceptionHandler
{
    void Handle(UnthrownException unthrownException);
}
```

**Note:** The `Handle` method accepts an instance of `UnthrownException`, not of `Exception`. This is explained in the [next chapter](#UnthrownExceptions).

A simple example of writing exceptions to the Console output:

First create a class that implements `IUnthrownExceptionHandler`.

```
class ConsoleExceptionHandler : IUnthrownExceptionHandler
{
    public void Handle(UnthrownException unthrownException)
    {
        Console.WriteLine(unthrownException);
    }
}
```

Then register it to the `ExceptionHandler`:

```
ExceptionHandler.Instance.ThrowExceptions = false;
ExceptionHandler.Instance.RegisterHandler(new ConsoleExceptionHandler());
```

Now, when an exception is handled by the ExceptionHandler, it will be written to the Console output. This example can be found in the [attached solution](#SolutionFile).

**Note:** When `ThrowExceptions` is `true`, exceptions will be simply thrown by the `ExceptionHandler`. **Note:** The stack trace of the exception will also contain the `Handle` method of the `ExceptionHandler`.

### Unthrown Exceptions

When an exception is not thrown by the `ExceptionHandler`, an `UnthrownException` is created for it. The `UnthrownException` class has the following properties:

-   `Exception` - The original exception class.
-   `StackTrace` - The stack trace of the exception, as a string.

**Note:** When catching an exception, the stack trace is shortened to contain the trace from the location it is caught to the location the exception is thrown. Because the exception is handled down the stack, `StackTrace` will contain the complete stack until the `Handle` method was called.

-   `Origin` - An instance of the `ExceptionOrigin` class, containing information about the origin of the exception.

The properties of `ExceptionOrigin`:

-   `CalledType` - The type of the class that created the exception.
-   `Method` - The name of the method in which the exception was created.
-   `Line` - The line number in the file in which the exception was created.
-   `Column` - The column number of the file in which the exception was created.

An example of using the `ExceptionOrigin` is to filter certain exceptions, or to use it to group reoccurring exceptions.

## How should I handle exceptions?

This is up to you. The [solution](#SolutionFile) I created is just a tool to make it possible.

But as exceptions probably indicate a serious problem, they should not be overlooked. You might want to log them to a dedicated exception log. And in case of a released product, it might also be useful to send a mail to the developers in case an exception occurs.

## When to handle and when to throw?

Again, this is up to you. But some examples might be:

### Throwing

-   **On develop machines** - Don't let developers get away with exceptions! In case of the [example above](#Background), just temporarily disable them by setting `ThrowExceptions` to false.
-   **On test machines** - During testing, it is very important to find any exception.

### Handling

-   **Released product** - This of course differs from situation to situation, but an example could be writing handlers that throw exceptions in critical components, but just log exceptions from less important components.
-   **Demo** - It might be useful to disable exceptions when giving a demo. Having one thing disappear from the screen might be preferable to an error pop-up to some stakeholders.

## Points of Interest

-   The [solution](#SolutionFile) is supposed to be a starting point. Since its implementation is simple, it can easily be altered to suit your needs.
    
-   By default, the ExceptionHandler uses a singleton pattern. You are of course free to ignore it.
-   If an exception is not thrown, finally blocks are being executed after an exception is handled. I've thought of adding an optional `Action` to the `Handle` method, but I've not had the need for this so far.
-   There are three reasons why I chose to pass an Exception class to the Handle methods (instead of just writing a message there, and creating an exception when needed):
    -   I wanted to change as little as possible on the user side. Now, only throw has to be replaced with the Handle call.
    -   It is now still very visible that a certain execution path is an exception.
    -   The type of `Exception` class contains information about the exception as well. When dealing with a `NullReferenceException`, you know what to look for. It also makes it easier to look for usages of certain exceptions.
-   I am not particularly happy with the name `ExceptionHandler` since it might be confusing in combination with `IUnthrownExceptionHandler`. I am open for suggestions.

## History

##### 21-12-2017 - Version 1

##### 02-01-2018 - Version 1.1

-   Re-throwing the exception in `ExceptionExt` in order to minimize the part of the stack trace created by the `ExceptionHandling` library.

##### 03-01-2018 - Version 1.2

-   The user can not specify a return value in the `Handle` method.
-   The `Handle` method in `ExceptionExt` will not re-throw exceptions anymore, as it can hide exceptions thrown by custom implementations of `IUnthrownExceptionHandler`. Instead, exceptions are now thrown immediately if this is desired, also minimizing the stack trace as it will not include the `ExceptionHandling` class.
