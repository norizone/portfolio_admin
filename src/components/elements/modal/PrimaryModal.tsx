'use client'

import { ReactNode, forwardRef } from 'react'
import ReactModal from 'react-modal'
import FocusLock from 'react-focus-lock'

export type PrimaryModalProps = {
  children: ReactNode
  handleToggleModal: () => void
  isOpen: boolean
  isOnlyBtn?: boolean
}

const customStyles = {
  overlay: {
    Position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#0c0c0c6f',
    zIndex: 20,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '840px',
    zIndex: 100,
    width: 'max-content',
    minHeight: '270px',
    overflow: 'hidden',
  },
}

ReactModal.setAppElement('body')

const PrimaryModal = forwardRef<HTMLElement, PrimaryModalProps>(
  (props: PrimaryModalProps, ref) => {
    const { children, handleToggleModal, isOpen, isOnlyBtn = false } = props

    return (
      <FocusLock ref={ref}>
        <ReactModal
          className='relative px-1 md:px-7 py-3 md:py-5 rounded-lg border-2 border-[#fff] flex-center flex-col outline-none
          after:absolute after:top-0 after:left-0 after:backdrop-blur-[12px] after:bg-[#ffffffb5] after:w-full after:h-full after:contents-[""] after:block after:z-[-1]'
          style={customStyles}
          isOpen={isOpen}
          onRequestClose={() => {
            !isOnlyBtn && handleToggleModal()
          }}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          {!isOnlyBtn && (
            <div className="absolute top-4 right-5 z-[55] cursor-pointer">
              <button onClick={handleToggleModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23.486"
                  height="23.486"
                  viewBox="0 0 23.486 23.486"
                >
                  <g transform="translate(4.243 4.243)">
                    <line
                      x2="15"
                      y2="15"
                      fill="none"
                      stroke="#707070"
                      strokeLinecap="round"
                      strokeWidth="6"
                    />
                    <line
                      x1="15"
                      y2="15"
                      fill="none"
                      stroke="#707070"
                      strokeLinecap="round"
                      strokeWidth="6"
                    />
                  </g>
                </svg>
              </button>
            </div>
          )}
          {children}
        </ReactModal>
      </FocusLock>
    )
  },
)

PrimaryModal.displayName = 'PrimaryModal'

export default PrimaryModal
