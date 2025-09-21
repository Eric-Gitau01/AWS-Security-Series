<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Cloud Security with AWS IAM

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-security-iam)

**Author:** Eric Gitau  
**Email:** gitaueric09@gmail.com

---

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_1c864649)

---

## Introducing Today's Project!

In this project, I will demonstrate how to use AWS Identity and Access Management (IAM) to control access and set permissions in my AWS account. I’m doing this project to build a strong foundation in cloud security, since access management is one of the very first concerns every company has when working in the cloud. In fact, there are even entire roles called IAM Engineers dedicated solely to this skill. That’s exactly what I’m about to start building today.

### Tools and concepts

Just completed hands-on learning with Amazon EC2 and AWS IAM, two foundational services that power secure, scalable cloud infrastructure!
Key takeaways:
a) Mastered IAM fundamentals: user policies, user groups, and account aliases
b) Explored the AWS Policy Simulator for testing and validating permissions
c) Gained practical experience with JSON policy structures
d) Learned EC2 essentials: launching instances and implementing tagging strategies
e) Practiced secure access management and switching between users

The combination of identity management through IAM and compute power through EC2 really shows how AWS enables both security and scalability. Excited to apply these skills in real-world cloud projects!

### Project reflection

This project took approximately 2 hours to complete, including time spent on planning, setting up IAM users and groups, creating policies, testing access, and verifying permissions using the IAM Policy Simulator.

---

## Tags

Tags are organizational tools that let me label and categorize my resources. In this project, I will use them to make resource management easier and more efficient. They are especially helpful for grouping resources, tracking costs, and applying policies across multiple resources at the same time.

The tag I used on my EC2 instances is called Env, which stands for environment. The values I assigned to my instances are Production and Development.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_2e0e5a5d)

---

## IAM Policies

IAM Policies are like rules that define who can do what within my AWS account. In this project, I am using policies to control who has access to our Production environment instances.

### The policy I set up

For this project, I’ve set up a policy using JSON.

I’ve created a policy that allows the policy holder (the intern) to have full permissions on any instance tagged with “Development”. They can also view information for all instances, but they are denied permissions to create or delete any instances.

### When creating a JSON policy, you have to define its Effect, Action and Resource.

The Effect, Action, and Resource attributes of a JSON IAM policy work as follows:
a) Effect → Specifies whether the policy is allowing or denying the action.
b) Action → Defines what the policy holder can or cannot do (e.g., ec2:StartInstances).
c) Resource → Identifies the specific AWS resources the policy applies to (e.g., EC2 instances with a certain tag).

---

## My JSON Policy

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_1c864649)

---

## Account Alias

An account alias is simply a nickname for my AWS account. Instead of logging in with a long numeric account ID, I can now use the account alias to make access simpler and more convenient.

Creating an account alias took me less than 30 seconds. Now, my new AWS Console sign-in URL is:

https://nextwork-alias-eric.signin.aws.amazon.com/console

This URL uses my alias instead of my long account ID, making it easier for me and my team to log in.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_0eb4439b)

---

## IAM Users and User Groups

### Users

IAM Users are people or entities that have access to and can log in to an AWS account

### User Groups

IAM User Groups are like folders that collect multiple IAM Users, allowing you to apply permission settings at the group level instead of individually for each user.

I attached the NetworkDevEnvironment IAM policy to this user group. This means that any user added to the group will automatically inherit the permissions defined in this policy.

---

## Logging in as an IAM User

There are two ways to provide sign-in details to a new IAM user:
a) Email the sign-in instructions directly to the user.
b) Download a CSV file containing the user’s sign-in details.

Once I logged in as the IAM user, I noticed that the user was denied access to the main AWS Console dashboard panels. This is because we only granted permissions for the Development EC2 instances, ensuring that the intern cannot see or access anything else in the account.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_6f2ab446)

---

## Testing IAM Policies

I tested my JSON IAM policy by attempting to stop both the Development and Production instances.

### Stopping the production instance

When I tried to stop the Production instance, I encountered an error. This happened because the Production instance is tagged with “Production”, which is outside the scope of the intern’s permission policy. Interns are only allowed to perform actions on Development instances.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_0e7a9d6a)

---

## Testing IAM Policies

### Stopping the development instance

Next, when I tried to stop the Development instance, I successfully saw its state change to stopping and then stopped. This is because our permission policy allows the intern (a user in the network-dev-group) to manage Development instances.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_1811801c)

---

## The IAM Policy Simulator

The IAM Policy Simulator is a tool that lets us simulate actions and test permission settings by specifying a particular user, group, or role and the actions to test. It’s especially useful for saving time and avoiding the risks of actually stopping or modifying resources while verifying permissions.

### How I used the simulator

I set up a simulation to test whether our Development user group had the correct permissions. Initially, the results were denied for all actions. I realized that I needed to adjust the scope to include only EC2 instances tagged with “Development”. Once I applied that tag, the permissions were correctly allowed.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-iam_069d8a621)

---

---
