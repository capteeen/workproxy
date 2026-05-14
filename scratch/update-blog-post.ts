import { prisma } from '../src/lib/prisma';

async function main() {
  const slug = "2-side-hustles-you-can-start-today-canada-friendly";
  
  const content = `Let's be real for a second—living in Canada right now is expensive. Between groceries feeling like a luxury and rent hitting record highs, a single income often feels like it's barely covering the essentials.

If you're looking to create a little extra breathing room in your budget without taking on a gruelling second job, you're in the right place. Today, we're breaking down two high-flexibility side hustles you can start right now from your couch. No investment, no specialized skills—just your time.

***

### 📝 1. Paid Surveys (The "Waiting in Line" Hustle)
You won't get rich doing surveys, but it's the absolute easiest way to monetize your downtime. Whether you're on the bus or waiting for water to boil, you can answer questions and earn cash or gift cards. 

**Honest Earnings:** Expect around $50 - $150 a month if you're consistent.

> **[🎯 TopSurveys.app](https://www.topsurveys.app/)**  
> A great aggregator that matches you with the highest-paying surveys available in your demographic.

> **[🌟 Prime Opinion](https://primeopinion.com/)**  
> Known for a clean interface, fast payouts, and a great welcome bonus system.

💡 **Pro Tip:** Stack your platforms! Sign up for both. When one platform runs dry on high-paying surveys, simply switch to the other. Never rely on just one.

***

### 🖱️ 2. User Testing (The "Speak Your Mind" Hustle)
Companies are desperate to know if their new websites and apps are confusing. They will literally pay you to record your screen while you navigate their site and speak your thoughts out loud.

**Honest Earnings:** Typically $10 - $30 per test (tests usually take 15–20 minutes). If you qualify for live interviews, you can make up to $90/hour.

> **[🔍 TestingTime](https://www.testingtime.com/en/become-a-paid-testuser/)**  
> Excellent for both unmoderated testing and higher-paying live focus groups.

> **[📱 UserTesting](https://www.usertesting.com/get-paid-to-test)**  
> The gold standard of the industry. They have a massive volume of tests, especially for tech-savvy users.

***

### Final Thoughts
Every little bit helps when you're trying to outpace the cost of living. Both of these hustles are entirely free to join, so there's zero risk in giving them a try this week. 

Do you know someone who could use an extra $200 a month for groceries or savings? Feel free to share this post with them! We're all in this together. 🔁`;

  const updated = await prisma.blogPost.update({
    where: { slug },
    data: { content }
  });

  console.log("Blog post updated successfully:", updated.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
