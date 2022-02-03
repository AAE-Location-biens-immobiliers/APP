export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.session.authenticated) {
    return redirect('/connexion')
  }
}
