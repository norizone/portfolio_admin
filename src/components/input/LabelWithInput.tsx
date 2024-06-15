import { LabelText, LabelTextProps } from '../textBlock/LabelText'
import { BaseInput, BaseInputProps } from './BaseInput'

type Props = BaseInputProps & LabelTextProps

export const LabelWithInput = (props: Props) => {
  const { children, lang, required, ...baseInputProps } = props
  const labelProps = { lang, required }
  return (
    <label className="flex gap-[.2em] flex-col">
      <LabelText {...labelProps}>{children}</LabelText>
      <BaseInput {...baseInputProps} />
    </label>
  )
}
