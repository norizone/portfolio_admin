import { ListCard } from '@/components/elements/card/ListCard'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import { title } from 'process'

const mockData = [
  {
    title: '制作実績',
    count: 3,
  },
  {
    title: 'ユーザー',
    count: 3,
  },
]

export default function Home() {
  return (
    <section>
      <PrimaryHeadline tag="h1">ダッシュボード</PrimaryHeadline>
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
    </section>
  )
}
