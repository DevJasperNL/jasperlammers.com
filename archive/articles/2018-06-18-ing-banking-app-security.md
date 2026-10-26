---
title: "The false sense of security in the ING Bankieren (Banking) App"
published: "2018-06-18"
originalUrl: "https://jasperlammers.com/the-false-sense-of-security-in-the-ing-bankieren-banking-app/"
waybackUrl: "https://web.archive.org/web/20190915093615/https://jasperlammers.com/the-false-sense-of-security-in-the-ing-bankieren-banking-app/"
firstCaptured: "2019-09-15"
wpId: 1089
---

Since more and more people in my environment are using the ING Banking app to pay and receive money, I also decided to give it a try. I was very pleased with it at first. It is easy to use and has a lot of functionalities. But after doing my first payment with the app, I started to wonder about its security. I started to experiment with the app, and even thought I'm not an expert in security, I was very disappointed about the results:

#### Debit cards (pin pas)

As the explanation is not a simple one, I want to start with something we all know: the debit card (or pin card). In order to use a debit card to pay or to retrieve money, it is always needed in combination with a 4 digit pin code. The pin code makes the card more secure, as a thief cannot use the card without it.

Nonetheless, a pin code is quite vulnerable. As it is used often, the code can easily be seen, or even be copied by a corrupted ATM. A person can then steal the card (or the ATM could have “[skimmed](https://nl.wikipedia.org/wiki/Skimmen)” the card) and all its functionality is usable for the thief.

To prevent large damages if both are stolen, a debit card has a daily limit. Even if the card and pin both fall into the wrong hands, the damage is limited. It is possible to change the daily limit on the online environment of ING, but this can only be done using yet another security method: A password that is not used when other people are around (and not used at the same moment as the pin code), and therefor even harder to steal.

This put together, makes the ING debit card system quite secure. Access to a limited amount of money is protected by one threshold, while access to more functionality is protected by another (not even mentioning the TAN code functionality).

#### Mobile phone application

Now, let’s have a look at the ING Banking app. Like the debit card, the phone application requires a pin code (5 digits), can be used to pay and is often used in public. However, unlike the debit card, the phone application can also be used to see all bank accounts, wire money from a savings account to a payment account and worst of all, it can be used to change its own daily limit, to a value of €50.000,-(!!).

Let that sink in for a bit.

Imagine someone managed to get hold of your debit card and pin code. The thief is able to withdraw money from your payment account, but is limited by either the card limit, or the amount of money on the payment account.

Now imagine a thief that is able to use your debit card and pin to not only withdraw money from your payment account, but also wire money from your savings account to your payment account, and change the daily limit on your debit card. Would you feel secure carrying such a card around and using it for everyday things? I know I wouldn’t.

#### Extra layers of security on your phone (app)

Of course, the situation is not quite so dire. You don’t put your phone in third party hardware (e.g. corrupted ATM's). And, of course, every phone has its own lock nowadays.

But this creates a false sense of security. As you unlock your phone multiple times a day, it is of little extra effort for a thief to find a way around it. If you use a pattern or pin, it can be seen. But even if you use biometric security, all that is needed is a well written virus and a vulnerability in your phone to get this information. When a thief is able to go over the first security threshold (your pin), the next thresholds are way easier to overcome because they are all one the same device: a single point of failure.

To me this feels like little more than having to enter two pin codes when using your debit card. Something we can all agree on to have little added value.

A final point that could be made, is that the app wires money to a known account, instead of being able to get your money in cash form. This makes it harder for thieves to get away with their crime, as the account numbers are not anonymous. But then again, a well-organized thief could use [money mules](https://en.wikipedia.org/wiki/Money_mule), and even if it is easy to track down, I would argue prevention is better than cure.

#### The voluntary argument

Of course, you are free to use (or not use) the ING Banking app. However, as it is an official app of the bank, a lot of people automatically assume it is safe to use. I believe a bank has a certain responsibility to its customer to live up to these expectations.

#### Conclusion

Even though the security of the ING Banking app is slightly better than that of the debit card, its additional security needed to get significantly more access to an ING account is managerial compared to the additional security offered by the online environment.

Therefor the use of the ING Banking app greatly decreases the security over your funds.

#### What can be done?

I believe all these problems can relatively easy be fixed if ING would move the app’s security permissions (daily limit, what bank accounts it can access and whether you can wire money from an account or only see the balance) to the online environment of ING. This way, no functionality will be lost, but the users can decide for themselves whether they want to take certain risks.

#### Side note

Changing the daily limit on the app takes a certain time to take effect (I believe this is 15 minutes). As I’m not sure if this is meant as a security measure, or just a technical latency, I decided to leave it out of the story. But even if it is a security measure, it will have close to no effect if you don’t notice someone else has access to your device. I find this implementation to be very strange, and as it is now, I hardly see any added value of the app's daily limit at all.

Thank you for reading my post. As I stated before, I am not a security expert, and if I'm wrong at some point, feel free to point it out (you can leave a comment on the [LinkedIn page](https://www.linkedin.com/pulse/false-sense-security-dutch-banks-ing-bankieren-banking-lammers) I published this post on). I just felt like this message had to be shared. Hopefully someone at ING picks it up, and does something with this information.
