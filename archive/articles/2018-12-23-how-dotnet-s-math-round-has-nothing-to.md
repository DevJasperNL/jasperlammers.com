---
title: "How .NET's Math.Round has Nothing to do with Maths. And That's OK!"
published: "2018-12-23"
platform: "CodeProject"
originalUrl: "https://www.codeproject.com/Tips/1272542/How-NETs-Math-Round-has-Nothing-to-do-with-Maths-A"
waybackUrl: "https://web.archive.org/web/20181224121142/https://www.codeproject.com/Tips/1272542/How-NETs-Math-Round-has-Nothing-to-do-with-Maths-A"
firstCaptured: "2018-12-24"
lastCaptured: "https://web.archive.org/web/20250114071846/https://www.codeproject.com/Tips/1272542/How-NETs-Math-Round-has-Nothing-to-do-with-Maths-A"
source: "backup/codeproject/1272542-How-NETs-Math-Round-has-Nothing-to-do-with-Maths-A.html"
---

## Introduction

Before we start, imagine what values "`a`" and "`b`" would have after running the following:

```csharp
a = Math.Round(1.5);
b = Math.Round(2.5);
```

If your answer is "`a = 2` and `b = 3`", you are, just like I was, wrong. The correct answer is that both `a` and `b` end up becoming `2`. Confused? You might want to stick around for the reason why.

## Background

About a week ago, I was working on some code that was moving two entities along the x-axis. Inside the library, their `x` value was a `double`, but the `public` interface only allowed for meters in the form of an integer. I used `Math.Round` to translate the `double` value into that integer.

One of the requirements for the code was that the entities could never be closer than one meter to each other. I used the rounded value to check this.

As you might have guessed by now, the code kept failing. Even though both entities started out exactly one meter apart, had the same starting speed and were accelerating with the same speed, using the same algorithm, the integer value kept returning the same `x` value once in a while and thus the code kept failing.

At first, I thought it was some kind of precision error as a result of using `double` values. But this wouldn't make much sense, as the algorithm would result in the same precision loss in both values. After some debugging, I eventually found out it was not the `double` but `Math.Round` that was behaving differently than I had anticipated.

## Bankers Rounding

After I had figured out the problem was with the use of `Math.Round`, I quickly figured out the problem: the default[\[1\]](#Ref1) implementation for rounding in .NET is "Round half to even"[\[2\]](#Ref2) a.k.a. "Bankers Rounding". This means that mid point values are rounded towards the nearest even number. In the example I provided in the introduction, this means both values are being round towards `2`, the nearest even number.

So why was it implemented like this in .NET? Is it a bug?

Well, when first implemented, Microsoft followed the IEEE 754 standard. This is the reason of the default `Math.Round` implementation.[\[3\]](#Ref3) (**Note**: The current IEEE 754 standard contains five rounding rules[\[4\]](#Ref4))

Another good reason is that bankers rounding does not suffer from negative or positive bias as much as the [r](http://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)ound half away from zero method over most reasonable distributions.

## Round Half Away From Zero

But all is not lost.

If you expect `1.5` to be rounded to `2` and `2.5` to be rounded to `3` (like I expected), the `Math.Round` method has an override that allows you to use the "Round half away from zero"[\[5\]](#Ref5) method instead.

```csharp
a = Math.Round(1.5, MidpointRounding.AwayFromZero);
b = Math.Round(2.5, MidpointRounding.AwayFromZero);
```

In the code snippet above, `1.5` is rounded to `2` and `2.5` is rounded to `3`.

## Round Half Up

Interestingly however, after doing some research, it looks like "Round half away from zero" is also not the method commonly used in maths. Instead, the "Round half up"[\[6\]](#Ref6) method is usually used[\[7\]](#Ref7) in maths. For positive numbers, there is no difference, but for negative numbers, mid point values are rounded towards +∞ instead of away from 0.

This way, there are the same amount of fractions being rounded to zero, while in the "Round half away from zero" method, both `0.5` and `-0.5` are not rounded to zero, making zero an exception to all other numbers.

## Math ≠ maths

So it turns out that the `Math.Round` method does not even support the actual rounding method that is commonly used in maths.

When I first discovered this, I was quite disappointed. After all, even with the good reasons that were provided, the library is still called `Math`. It does seem to communicate a certain intent.

But writing this article did make me think: before looking into it, I was not even aware there were [so many rounding methods](https://en.wikipedia.org/wiki/Rounding). Each with its own pros and cons. Each with its own consequences. If I didn't know about all these methods, I certainly did not know about those consequences. So maybe it is not such a bad thing that someone else did this for me, and made the appropriate "default" decision.

After all, if the consequences of your rounding are that critical to your code, I do hope that you don't make the assumptions I did, or at least discover they were wrong with some good old fashion tests.

## Wrapping Up

Even though this subject isn't really brain surgery (or rocket science for that matter), I do hope you learned something new, or at least enjoyed the read.

In the end, I think this is a good reminder of how complex even the seemingly simple things we use every day can be. And there is probably a lesson about assumptions in here as well. ;)

Happy rounding!

## Other Programming Languages

After discussing this subject with others, I got curious how other languages handle the mid point values. I was happily surprised that almost every language did have this subject covered. However, there are a lot of differences between languages.

To hopefully help someone in the future, I have mapped the rounding methods in a table. **X's in bold** are default implementations, other X's are optional parameters or separate methods.

In an attempt to not clutter the references list, the language names in the table link to the documentation I used.

Without further ado, the big "programming language/rounding method table":

|   | [Java](https://docs.oracle.com/javase/10/docs/api/java/lang/Math.html#round\(float\)) | [C](http://www.gnu.org/software/libc/manual/html_node/Rounding-Functions.html) | [Python](https://docs.python.org/3.7/library/functions.html#round)\* | [C++](http://www.cplusplus.com/reference/cmath/round/) | [VB .NET](https://docs.microsoft.com/en-us/dotnet/api/system.math.round?view=netframework-4.7.2#midpoint-values-and-rounding-conventions) | [Java  
Script](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) | [C#](http://docs.microsoft.com/en-us/dotnet/api/system.math.round?view=netframework-4.7.2#midpoint-values-and-rounding-conventions) | [PHP](http://php.net/manual/en/function.round.php) | [Objective C](https://developer.apple.com/documentation/coregraphics/cgfloat/2882781-round) | [MATLAB](https://www.mathworks.com/help/matlab/ref/round.html) | [R](https://www.rdocumentation.org/packages/base/versions/3.5.2/topics/Round) | [Perl](https://metacpan.org/pod/Math::Round) | [Swift](https://developer.apple.com/documentation/swift/double/2884722-round) | [Go](https://golang.org/pkg/math/#Round) | [Delphi](http://www.delphibasics.co.uk/RTL.asp?Name=Round) | [Ruby](https://ruby-doc.org/core-trunk/Float.html#method-i-round)\*\* |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up) | **X** | X |   |   |   | **X** |   | **X** |   |   |   |   |   |   |   |   |
| [Round half down](https://en.wikipedia.org/wiki/Rounding#Round_half_down) |   | X |   |   |   |   |   | X |   |   |   |   |   |   |   |   |
| [Round half towards zero](https://en.wikipedia.org/wiki/Rounding#Round_half_towards_zero) |   | X |   |   |   |   |   |   |   |   |   |   |   |   |   | X |
| [Round half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) |   | **X** |   | **X** | X |   | X |   | **X** | **X** |   | **X** | **X** | **X** |   | **X** |
| [Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even) |   | X | **X** |   | **X** |   | **X** | X |   |   | **X** | X |   | X | **X** | X |
| [Round half to odd](https://en.wikipedia.org/wiki/Rounding#Round_half_to_odd) |   |   |   |   |   |   |   | X |   |   |   | X |   |   |   |   |
| [Random tie-breaking](https://en.wikipedia.org/wiki/Rounding#Random_tie-breaking) |   |   |   |   |   |   |   |   |   |   |   | X |   |   |   |   |

\* The table references Python 3.7 but [Python 2](https://docs.python.org/2/library/functions.html#round) actually has a different round implementation. It will round half away form zero.  
\*\* The mode keywords in Ruby are `:up` for "round half away from zero" and `:down` for "round half towards zero", making them quite confusing in my opinion.

As I have no experience with most of these languages, feel free to point out any mistakes. I will correct the table accordingly.

## References

1.  [https://docs.microsoft.com/en-us/dotnet/api/system.math.round?view=netframework-4.7.2#midpoint-values-and-rounding-conventions](https://docs.microsoft.com/en-us/dotnet/api/system.math.round?view=netframework-4.7.2#midpoint-values-and-rounding-conventions)
2.  [https://en.wikipedia.org/wiki/Rounding#Round\_half\_to\_even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even)
3.  [http://stackoverflow.com/questions/311696/why-does-net-use-bankers-rounding-as-default/6562018#6562018](http://stackoverflow.com/questions/311696/why-does-net-use-bankers-rounding-as-default/6562018#6562018)
4.  [https://en.wikipedia.org/wiki/IEEE\_754#Rounding\_rules](https://en.wikipedia.org/wiki/IEEE_754#Rounding_rules)
5.  [https://en.wikipedia.org/wiki/Rounding#Round\_half\_away\_from\_zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)
6.  [https://en.wikipedia.org/wiki/Rounding#Round\_half\_up](https://en.wikipedia.org/wiki/Rounding#Round_half_up)
7.  [https://www.mathsisfun.com/numbers/rounding-methods.html](https://www.mathsisfun.com/numbers/rounding-methods.html) (not sure about the reliability of this reference, but I couldn't find a lot about rounding methods in maths)

## History

-   23-12-2018 - Version 1
-   23-12-2018 - Version 1.1
    -   Minor textual changes
-   24-12-2018 - Version 1.2
    -   Clarified example
-   26-12-2018 - Version 1.3
    -   Minor textual change
-   05-01-2018 - Version 2.0
    -   Added chapter "[Other Programming Languages](#OtherLanguages)"
