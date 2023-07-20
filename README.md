
The demo is deployed on Vercel, but if you want to run the development server:

#### npm run dev

Head over to the [Credentials Link ](https://zulker-nien.github.io/demo-json-data/db.json) to use the information for signin.
#### Navbar elements are loaded dynamically based on the role of the user.
I have used [NextAuth](https://next-auth.js.org/) to help with the signIn and signOut of users with different roles.

For signup, I used demo api from [Fakestoreapi](https://fakestoreapi.com/docs). Check the inspect element when you submit the registration form.

For loading the products, I have used [Fakestore's get all product api](https://fakestoreapi.com/docs#:~:text=Products-,Get%20all%20products,-fetch(%27https)).

The selected products are added to cart through state management.
#### MobX store was used for state management. 
It is lightweight and is less complex than redux. An additional observer dependency was required from mobx-react-lite.

For the admin dashboard, which is the "Home" on the Navbar, I have used Tremor to add the analytical charts.

#### Features that aren't added.
1) Toastify - To display notifications. 
2) Framer-motion - To animate the abrupt loading(Only Cart slider utilizes this dependency).

#### This assessment was done in 3 WORKDAYS, without creating the user flows, ui design and ofcourse the whole architecture design.
- User flows would have helped with ease in route.
- I am a certified Ui Designer and based on my past experiences, this is a mediocre design. A full thoughtout design would have helped in better user experience.
- With better architecture design, a robust product can be made.

### Some of the elements have been left open ended due to time constraint.
1) My Orders - Customer View
2) Edit Products - Admin/Manager View


Finally, another addition to the list of projects for which I am thankful to [Repliq](https://www.repliq.dev/)
