import { ListCard } from '@/components/elements/card/ListCard'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'

const mockAccount = [
  {
    title: 'Email',
    count: 'example.mail.com',
  },
]

const mockData = [
  {
    title: '制作実績',
    count: 3,
  },
  { title: 'ユーザー', count: 4 },
  {
    title: 'ツール',
    count: 3,
  },
]

export default function Home() {
  return (
    <section>
      <PrimaryHeadline tag="h1">管理者情報</PrimaryHeadline>
      <ul className="flex flex-col mt-[2em] gap-[1em]">
        {mockAccount.map((data, index) => (
          <ListCard key={index}>
            <div className="grid grid-cols-[10em_1fr] gap-[1em] px-[2em]">
              <p>{data.title}</p>
              <p>{data.count}</p>
            </div>
          </ListCard>
        ))}
      </ul>
      <div className="mt-[4em]">
        <PrimaryHeadline tag="h2">ダッシュボード</PrimaryHeadline>
        <ul className="grid grid-cols-3 mt-[2em] gap-[1em]">
          {mockData.map((data, index) => (
            <ListCard key={index}>
              <div className="flex-center flex-col gap-[.6em]">
                <p>{data.title}</p>
                <p>{data.count}件</p>
              </div>
            </ListCard>
          ))}
        </ul>
      </div>
    </section>
  )
}
