<template>
  <div class="px-4 md:ml-5 mt-10 text-white">
    <quote-added-modal />
    <comment-added-modal />
    <div v-for="(quote, index) in quotes" :key="quote.id" class="p-3 mb-5 bg-[#11101A] rounded-lg">
      <section class="flex items-center">
        <img
          :src="
            quote.avatar ? quote.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="h-[40px] lg:h-[50px] max-w-[60px] rounded-full"
        />
        <p class="ml-5">Username</p>
      </section>
      <section class="my-5">
        <p class="break-all">
          "{{ quote.body['bodyKa'] }}" Movie - {{ quote.movie.name['nameKa'] }}. ({{
            quote.movie.release_date
          }})
        </p>
      </section>
      <section>
        <img
          src="https://i.postimg.cc/4dpWbhzk/landing-page.png"
          alt="quote img"
          class="xl:w-[890px] xl:h-[500px]"
        />
      </section>
      <section class="flex gap-4 py-4 border-b border-[#EFEFEF]">
        <p>Comment length 13</p>
        <CommentIcon />
        <p>Comment Likes 13</p>
        <LikedQuote :quoteId="quote.id" />
      </section>
      <section class="py-4" v-for="comment in quote.comments" :key="comment.id">
        <div class="flex items-center">
          <img
            :src="
              comment.user_avatar
                ? comment.user_avatar
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            "
            class="h-[40px] lg:h-[50px] rounded-full max-w-[60px]"
          />
          <p class="ml-5">{{ comment.username }}</p>
        </div>
        <div class="lg:ml-[70px] pb-4 mt-3 border-b border-[#EFEFEF]">
          <p>{{ comment.body }}</p>
        </div>
      </section>
      <section>
        <Form class="flex items-center py-3 w-full">
          <img
            src="https://avatars.githubusercontent.com/u/91054978?v=4"
            class="h-[40px] lg:h-[50px] rounded-full mr-5 max-w-[60px]"
          />
          <comment-input
            name="comment"
            classes="w-full py-2 px-3 rounded bg-[#24222F]"
            :placeholder="$t('placeholders.write_comment')"
          />
        </Form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { logoutUser } from '../services/requests/sendRequest'
import QuoteAddedModal from './QuoteAddModal.vue'
import CommentAddedModal from './CommentAddedModal.vue'
import CommentInput from './CommentInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const quotes = [
  {
    id: 14,
    username: 'beqa',
    avatar: 'https://avatars.githubusercontent.com/u/91054978?v=4',
    body: {
      bodyKa: '“Follow your dream.”',
      bodyKa: '“Follow your dream.”'
    },
    movie: {
      name: {
        nameKa: '“Follow your dream.”',
        nameEn: '“Follow your dream.”'
      },
      release_date: 1920
    },
    comments: [
      {
        id: 1,
        username: 'gigi',
        user_avatar: 'https://avatars.githubusercontent.com/u/113327123?v=4',
        body: 'hello bro how are you'
      },
      {
        id: 2,
        username: 'gio',
        user_avatar: 'https://avatars.githubusercontent.com/u/13327123?v=2',
        body: 'Nice movie ^_^'
      }
    ]
  }
]
</script>
