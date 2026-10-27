---
title: V.I.P. (Video Internet Pipeline)
standfirst: Graduation project at Memoria Media, February to June 2011.
years: '2011'
summary: 'My graduation project: a framework that spreads video processing over multiple computers.'
description: "V.I.P., Jasper Lammers' graduation project at Memoria Media in 2011: a framework that spreads video processing over multiple computers. Thesis included."
order: 2
---

Memoria Media filmed funerals with a camera system they had built themselves, edited the footage on the spot and streamed it over the internet. After five years they wanted to replace the hardware with software. A first software prototype from 2010 wasn't stable enough, and it used a video library (Medialooks) they wanted to swap for a cheaper one.

My graduation assignment was to find out how to do it properly, then design and build it. I was project leader, architect and developer.

The research pointed to spreading the work over several computers that share their processing power. That became V.I.P.: a framework that forms a cloud from the computers you give it, and distributes the steps of a processing pipeline over them, based on what each step does and what each machine can handle. It used DirectShow instead of the paid library, and a plug-in design so it could be extended.

The research turned out bigger and more important than planned, so the implementation wasn't finished within the graduation period. What did work: a pipeline running across multiple computers, controlled over a network or the internet. I handed the project over to Memoria Media to finish.

I graduated in June 2011, cum laude.

## Thesis

- [Thesis (PDF)](/files/V.I.P.-Thesis-Jasper-Lammers.pdf)
- [Thesis with appendices (ZIP; the appendices are in Dutch)](/files/V.I.P.-Thesis-Jasper-Lammers.zip)

## Videos

- [The graduation presentation](https://www.youtube.com/watch?v=2Peihq7a-hE)
- [Demonstration on one computer](https://www.youtube.com/watch?v=rgEVgbjdBxU)
- [Demonstration across multiple computers](https://www.youtube.com/watch?v=4UB6kBZJLOc)
- [Fault tolerance demonstration](https://www.youtube.com/watch?v=DGCPoP1rBqU)
