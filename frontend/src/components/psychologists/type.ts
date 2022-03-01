export default interface IPsychologistItem {
  id: string,
  name: string,
  image: string,
  detail_text: string,
  form_opened?: boolean,
  form_sent?: boolean
}