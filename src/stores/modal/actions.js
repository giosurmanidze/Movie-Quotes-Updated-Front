export function toggleQuoteAddedModal() {
  this.showQuoteAddedModal = !this.showQuoteAddedModal
}
export function toggleEditModal() {
  this.showEditMovieModal = !this.showEditMovieModal
  localStorage.setItem('showEditMovieModal', JSON.stringify(this.showEditMovieModal))
}
export function toggleMovieDeletedModal() {
  this.showMovieDeletedModal = !this.showMovieDeletedModal
}
export function toggleAddQuoteFromMovie() {
  this.showAddQuoteFromMoviesModal = !this.showAddQuoteFromMoviesModal
  localStorage.setItem(
    'showAddQuoteFromMoviesModal',
    JSON.stringify(this.showAddQuoteFromMoviesModal)
  )
}
export function toggleAddQuotesModal() {
  this.showAddQuotesModal = !this.showAddQuotesModal
  localStorage.setItem('showQuoteAddModal', JSON.stringify(this.showAddQuotesModal))
}
export function toggleEditQuoteModal() {
  this.showEditQuoteModal = !this.showEditQuoteModal
  localStorage.setItem('showEditQuoteModal', JSON.stringify(this.showEditQuoteModal))
}
export function toggleQuoteDeletedModal() {
  this.showQuoteDeletedModal = !this.showQuoteDeletedModal
}
export function toggleMovieAddedModal() {
  this.showMovieAddedModal = !this.showMovieAddedModal
}
export function toggleAddMoviesModal() {
  this.showAddMoviesModal = !this.showAddMoviesModal
  localStorage.setItem('showMovieAddModal', JSON.stringify(this.showAddMoviesModal))
}
export function toggleViewQuoteModal() {
  this.showViewQuoteModal = !this.showViewQuoteModal
  localStorage.setItem('showViewQuoteModal', JSON.stringify(this.showViewQuoteModal))
}
export function toggleCommentAddedModal() {
  this.showCommentAddedModal = !this.showCommentAddedModal
}
