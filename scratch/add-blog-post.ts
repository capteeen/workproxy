import { prisma } from '../src/lib/prisma';

async function main() {
  // Find an admin user or any user to assign as author
  let user = await prisma.user.findFirst({ where: { role: 'admin' } });
  
  if (!user) {
    user = await prisma.user.findFirst();
  }

  if (!user) {
    // Create a dummy user if none exists
    user = await prisma.user.create({
      data: {
        email: 'admin@workproxy.fun',
        name: 'Work Proxy Admin',
        role: 'admin'
      }
    });
  }

  const title = "💡 2 Side Hustles You Can Start Today (Canada-Friendly)";
  const slug = "2-side-hustles-you-can-start-today-canada-friendly";
  
  const content = `No investment. No special skills. Just your time.

***

### 📝 1. PAID SURVEYS
Answer questions, earn rewards. Simple as that.
→ [TopSurveys.app](https://www.topsurveys.app/)
→ [Prime Opinion](https://primeopinion.com/)

***

### 🖱️ 2. USER TESTING
Companies pay real people to test their websites and apps. You give feedback, they pay you.
→ [TestingTime](https://www.testingtime.com/en/become-a-paid-testuser/)
→ [UserTesting](https://www.usertesting.com/get-paid-to-test)

***

All links are free to sign up. Great for anyone with a few spare hours a week. Feel free to share with someone who could use the extra income! 🔁`;

  const existingPost = await prisma.blogPost.findUnique({ where: { slug } });

  if (existingPost) {
    console.log("Post already exists!");
    return;
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      content,
      published: true,
      authorId: user.id
    }
  });

  console.log("Blog post created successfully:", post.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
