/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        banner_gradient: 'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)'
      },
      screens: {
        xs: '310px'
      },
      colors: {
        modal_bg: '#11101A',
        modal_header_line: '#656464',
        choose_img_btn: '#462676',
        green_border: '#198754',
        text_color: '#DDCCAA',
        btn_color: '#E31221',
        navbar_color: '12101A',
        menu_layout_bg: '#181623',
        add_quote_btn: '#24222F',
        input_text: '#a1a5a8',
        gold_color: '#DDCCAA',
        quote_text: '#CED4DA',
        label_color: '#DC3545',
        input_bg: '#CED4DA',
        genre_text: '#6C757D',
        forgot_pass_text: '#0D6EFD',
        main_bg_color: '#222030',
        alert_bg_color: '#BADBCC',
        alert_text_color: '#0F5132',
        edit_modal_bg_color: '#D1E7DD',
        no_page_bg_color: '#181623'
      }
    }
  },
  plugins: []
}
