"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginForm = {
  "email": string,
  "password": string
}

// スキーマ
const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, '1文字以上入力してください。'),
});
type params = z.infer<typeof Schema>;

const Home = () => {
  const {register, watch, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(Schema)})

  const Login: SubmitHandler<LoginForm> = () => {
    console.log("Ok")
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl text-center font-bold mb-4">ユーザ登録</h1>
        <form className="flex flex-col w-full items-center space-y-3" onSubmit={handleSubmit(Login)}>
          <input type="email" {...register('email')} placeholder="メールアドレス" className="border border-gray-300 rounded px-2 py-1">
            {errors.email && (
              <div className="text-sm font-medium text-red-700 dark:text-red-800">
                {errors.email.message}
              </div>
            )}
          </input>
          <input type="password" {...register('password')} placeholder="パスワード" className="border border-gray-300 rounded px-2 py-1">
            {errors.password && (
              <div className="text-sm font-medium text-red-700 dark:text-red-800">
                {errors.password.message}
              </div>
            )}
          </input>
          <button className="w-full rounded-lg bg-teal-500 px-3 py-2 text-lg font-semibold text-white focus:outline-none" type="submit">
            登録
          </button>
        </form>
      </div>
    </div>
  )
};

export default Home;
