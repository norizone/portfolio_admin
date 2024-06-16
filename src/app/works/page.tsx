'use client'
import { BaseBtn } from '@/components/btn/BaseBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { BasePagination } from '@/components/pagination/BasePagination'
import { BaseTable } from '@/components/table/BaseTable'
import { useState } from 'react'
import { useFixBody } from '@/hooks/useFixeBody'
import { DeleteModal } from '@/components/modal/DeleatModal'

export default function Works() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { fixBody, unfixedBody } = useFixBody()
  const handleOpenModal = () => {
    isOpenModal ? unfixedBody() : fixBody()
    setIsOpenModal(!isOpenModal)
  }

  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績一覧
      </PrimaryHeadline>
      <div className="mt-[2em] text-right">
        <BaseBtn
          onClick={(e) => {
            e.preventDefault
          }}
          btnColor="primary"
        >
          新規作成
        </BaseBtn>
      </div>
      <div className="mt-[2em]">
        <BaseTable onDelete={handleOpenModal} />
      </div>
      <div className="mt-[2em]">
        <BasePagination allPage={20} currentPage={3} />
      </div>
      <DeleteModal
        isOpen={isOpenModal}
        handleOpenModal={handleOpenModal}
        modalType="confirm"
        onSubmit={() => {}}
      />
    </section>
  )
}
