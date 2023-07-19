/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { IUser } from '../..'
import { WritableDraft } from 'immer/dist/internal'

const initialState: CommentSliceState = {
  comments: [
    {
      id: "1",
      content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "2023-07-19T16:23:28.702Z",
      score: 12,
      user: {
        image: { 
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp"
        },
        username: "amyrobson"
      },
      replies: []
    },
    {
      id: "2",
      content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '2023-07-19T15:23:28.702Z',
      score: 5,
      user: {
        image: { 
          png: './images/avatars/image-maxblagun.png',
          webp: './images/avatars/image-maxblagun.webp'
        },
        username: 'maxblagun'
      },
      replies: [
        {
          id: "3",
          content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '2023-07-19T15:12:28.702Z',
          score: 4,
          replyingTo: 'maxblagun',
          replies: [],
          user: {
            image: { 
              png: './images/avatars/image-ramsesmiron.png',
              webp: './images/avatars/image-ramsesmiron.webp'
            },
            username: 'ramsesmiron'
          }
        },
        {
          id: "4",
          content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2023-07-18T16:23:28.702Z",
          score: 2,
          replyingTo: "ramsesmiron",
          replies: [],
          user: {
            image: { 
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          }
        }
      ]
    }
  ],
  status: 'idle',
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload
    },
    handleScoreUpdate: (state, action: PayloadAction<any>) => {
      const originalCommentId = action.payload.originalCommentId;
      const commentId = action.payload.commentId;
      const value = action.payload.value;

      // If searching within comments use original comment Id to search
      if (!originalCommentId) {
        const comment = state.comments.find((item: IComment) => item.id === commentId);
        if (!comment) return;

        const commentIndex = state.comments.indexOf(comment);
        state.comments[commentIndex].score += value;
      }
      else {
        const comment = state.comments.find((item: IComment) => item.id === originalCommentId);
        if (!comment) return;

        const reply = comment.replies?.find((item: IComment) => item.id === commentId)
        if (reply && comment.replies) {
          const commentIndex = state.comments.indexOf(comment);
          const replyIndex = comment.replies?.indexOf(reply);
          state.comments[commentIndex].replies![replyIndex].score += value;
        }
      }
    },
    addReply: (state, action: PayloadAction<IReply>) => {
      const item = action.payload;

      // check first level comments first
      // find comment and push into replies
      const comment = state.comments.find(c =>  c.id === item.commentId)
      if (comment) {
        const commentIndex = state.comments.indexOf(comment);
        state.comments[commentIndex].replies?.push(item.comment);
        return;
      }

      // if not replying a comment, must be replying a reply
      // for each comment, check their replies for commentId
      for (let i = 0; i < state.comments.length; i++) {
        if (state.comments[i].replies) {
          const reply = state.comments[i].replies!.find(r =>  r.id === item.commentId)
          if (reply) {
            const replyIndex = state.comments[i].replies!.indexOf(reply);
            state.comments[i].replies![replyIndex].replies?.push(item.comment)
            return;
          }
        }
      }
    },
    delete: (state, action: PayloadAction<string>) => {
      const item = action.payload;
 
      // check first level comments first
      const comment = state.comments.find(c =>  c.id === item)
      if (comment) {
        const commentIndex = state.comments.indexOf(comment);
        state.comments.splice(commentIndex, 1);
        return;
      }

      // checking first level replies
      for (let i = 0; i < state.comments.length; i++) {
        const reply = state.comments[i].replies.find(r => r.id === item);
        if (reply) {
          const replyIndex = state.comments[i].replies.indexOf(reply);
          state.comments[i].replies.splice(replyIndex, 1)
          return;
        }

        // checking second level
        state.comments[i].replies.forEach(replyItems => {
          if (replyItems.replies && replyItems.replies.length > 0) {
            const reply = replyItems.replies.find(r => r.id === item);
            if (reply) {
              const replyIndex = replyItems.replies.indexOf(reply);
              replyItems.replies.splice(replyIndex, 1);
              return;
            }
          }
        });
      }
    },
    update: (state, action: PayloadAction<IComment>) => {
      const item = action.payload
      // check first level comments first
      const comment = state.comments.find(c => c.id == item.id)
      if (comment) {
        const commentIndex = state.comments.indexOf(comment);
        state.comments[commentIndex].content = item.content
        return;
      }

      // check replies
      for(let i = 0; i < state.comments.length; i++) {
        const reply = state.comments[i].replies.find(r => r.id === item.id);
        if (reply) {
          const replyIndex = state.comments[i].replies.indexOf(reply);
          state.comments[i].replies[replyIndex].content = item.content;
          return;
        }

        
        state.comments[i].replies.forEach(replyItems => {
          if (replyItems.replies && replyItems.replies.length > 0) {
            const reply = replyItems.replies.find(r => r.id === item.id);
            if (reply) {
              const replyIndex = replyItems.replies.indexOf(reply);
              replyItems.replies[replyIndex].content = item.content;
              return;
            }
          }
        });
      }
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      const comment = action.payload;
      state.comments.push(comment)
      return;
    },
    setSavedComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    }
  },
})

/* Types */
export interface CommentSliceState {
  comments: IComment[],
  replyingto?: string,
  status: 'idle' | 'loading' | 'failed'
}

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  replyingTo?: string;
  score: number;
  user: IUser;
  replies: IComment[]
}

export interface IReply {
  commentId: string
  comment: IComment
}
