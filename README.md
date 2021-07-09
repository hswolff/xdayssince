# XDaysSince

Check out the YouTube video so that this entire readme makes more sense.

"Gonna show you how I program, Googling and all"

this isn't necessarily to show you how to make this app, but to show you how i make apps
show you my thinking, show you how i work, how i fail, how i google
it's gonna be raw and unfiltered

```
users {} (next auth)

incidents {
    \_id: unique(slug),
    created: date,
    lastOccurrence: date,
    title: string,
    creator_id: user_ObjectId
}
```

`{lastOccurrence relative date} days since {title}`

## User Stories

User goes to home page /
User sees a random Incident title show on page
User is prompted to register to create their own or login

User registers
User redirected to their profile page
User clicks create new incident
User goes to /create
User saves page
Goes to new incident page /i/:slug

User goes to profile page /profile
Sees list of Incidents they own
Can click to each incident

User goes to an incident page that they created
User clicks an edit button that lets them edit the incident details

User goes to an incident page that they created
User clicks button that registers a new Incident occurred
User sees timer go back to zero

## Tech Stack

https://hswolff.com/blog/my-tech-stack-2020-edition/

- Next.js
- TailwindCSS
- https://headlessui.dev/
- https://heroicons.com/
- React Context / React Query
- MongoDB Atlas
- NextAuth.js
- Vercel

## Tickets

1. Scaffold out initial pages with dummy data (using TypeScript)
   - Create nav to navigate to relevant pages
   - Create pages:
     - /
     - /create
     - /profile
     - /i/:slug
2. Add support for a user to login with NextAuth
   - Create local GitHub OAuth app
   - If user isn't logged in and they go to /create redirect to /
   - If user isn't logged in and they go to /profile redirect to /
   - If user is logged in show users info on /profile page
3. Add local MongoDB support and replace dummy data with database
   - Use Mongoose w/ TypeScript
     - https://docs.mongodb.com/drivers/node/master/quick-start/
     - https://mongoosejs.com/docs/index.html
     - https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
   - [Update NextAuth to store users in MongoDB](https://next-auth.js.org/configuration/options#database)
   - Create Incidents schema
   - (Maybe) Inject dummy data for:
     - 1-3 random Incident pages
     - [Use fallback: blocking](https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking)
4. Add basic support for creating a new incident (make /create page functional)
   - Add Formik
   - Create form to create incident
     - input: title
     - input: last occurred
   - Create API endpoint to submit field via ajax
     - /api/create
   - ~Add React-Query~
   - use [slugify](https://www.npmjs.com/package/slugify) to save slug of title
   - On success go to incident page
5. Add support for listing users list of incidents on their profile page
   - Link to incident page
   - Add button to delete incident
   - Make delete button functional
6. Add button on incident page to register a new incident (and reset lastOccurrence field)
   - Only if the user owns the Incident
7. Add support for editing an incident from the incident page
   - At URL /i/:slug/edit
   - Create UI to edit fields
   - Create API endpoint to submit changes /api/edit
8. Create MongoDB Atlas cluster and get it working in production
   - Add `MONGODB_URI` environmental variable to Vercel
9. Style incident page
   - make it big and responsive
10. Style profile page

    - Simple list of Incidents

11. Style home page
12. Launch on Vercel!
    - Create production GitHub OAuth app
    - Add correct env variables to vercel
