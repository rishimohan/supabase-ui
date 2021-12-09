import React, { useState } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import { Card } from '../Card'
import { IconCheck } from '../Icon/icons/IconCheck'

// @ts-ignore
import DropdownStyles from './Dropdown.module.css'

import type * as RadixDropdownTypes from '@radix-ui/react-dropdown-menu/'

import styleHandler from '../../lib/theme/styleHandler'
import { IconTarget } from '../..'

interface RootProps {
  open?: boolean
  arrow?: boolean
  onOpenChange?: RadixDropdownTypes.DropdownMenuOwnProps['onOpenChange']
  side?: RadixDropdownTypes.DropdownMenuContentOwnProps['side']
  align?: RadixDropdownTypes.DropdownMenuContentOwnProps['align']
  overlay?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function Dropdown({
  open,
  onOpenChange,
  align = 'center', //Default value
  side = 'bottom', //Default value
  overlay,
  children,
  className,
  style,
  arrow,
}: RootProps) {
  let __styles = styleHandler('dropdown')

  let classes = [__styles.content]
  if (className) {
    classes.push(className)
  }

  return (
    <RadixDropdown.Root onOpenChange={onOpenChange} open={open}>
      <RadixDropdown.Trigger className={__styles.trigger}>
        {children}
      </RadixDropdown.Trigger>

      <RadixDropdown.Content
        disableOutsidePointerEvents={false}
        sideOffset={8}
        side={side}
        align={align}
        className={classes.join(' ')}
        style={style}
      >
        {arrow && (
          <RadixDropdown.Arrow
            className={__styles.arrow}
            offset={10}
          ></RadixDropdown.Arrow>
        )}
        {overlay}
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  )
}

export function RightSlot({ children }: any) {
  let __styles = styleHandler('dropdown')
  return <div className={__styles.right_slot}>{children}</div>
}

interface ItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: (event: Event) => void
  rightSlot?: string
}

export function Item({
  children,
  icon,
  disabled,
  onClick,
  rightSlot,
}: ItemProps) {
  let __styles = styleHandler('dropdown')

  return (
    <RadixDropdown.Item
      className={__styles.item}
      disabled={disabled}
      onSelect={onClick}
    >
      {icon && icon}
      <span>{children}</span>
    </RadixDropdown.Item>
  )
}

export function Misc({ children, icon }: ItemProps) {
  let __styles = styleHandler('dropdown')
  return (
    <div className={__styles.misc}>
      {icon && icon}
      {children}
    </div>
  )
}

interface CheckboxProps {
  children: React.ReactNode
  checked?: boolean
  onChange?(x: boolean): void
  disabled?: boolean
  ItemIndicator?: React.ReactNode
}

export function Seperator() {
  let __styles = styleHandler('dropdown')

  return <RadixDropdown.Separator className={__styles.seperator} />
}

export function Checkbox({
  children,
  checked: propsChecked,
  onChange,
  disabled,
  ItemIndicator,
}: CheckboxProps) {
  const [checked, setChecked] = useState(propsChecked ? propsChecked : false)

  let __styles = styleHandler('dropdown')

  const handleChange = (e: boolean) => {
    if (onChange) onChange(e)
    setChecked(e)
  }

  return (
    <RadixDropdown.CheckboxItem
      checked={checked}
      onCheckedChange={handleChange}
      className={`${__styles.item} ${__styles.input}`}
      disabled={disabled}
    >
      <RadixDropdown.ItemIndicator className={__styles.check}>
        {ItemIndicator ? (
          ItemIndicator
        ) : (
          <IconCheck size="tiny" strokeWidth={3} />
        )}
        <RadixDropdown.CheckboxItem />
      </RadixDropdown.ItemIndicator>
      <span>{children}</span>
    </RadixDropdown.CheckboxItem>
  )
}

interface RadioProps {
  children: React.ReactNode
  value: string
  ItemIndicator?: React.ReactNode
}

export function Radio({ children, value, ItemIndicator }: RadioProps) {
  let __styles = styleHandler('dropdown')

  return (
    <RadixDropdown.RadioItem
      value={value}
      className={`${__styles.item} ${__styles.input}`}
    >
      <RadixDropdown.ItemIndicator className={__styles.check}>
        {ItemIndicator ? (
          ItemIndicator
        ) : (
          <IconTarget strokeWidth={6} size={10} />
        )}
      </RadixDropdown.ItemIndicator>
      <span>{children}</span>
    </RadixDropdown.RadioItem>
  )
}

interface RadioGroupProps {
  children: React.ReactNode
  value: string
  onChange?(x: string): void
}

export function RadioGroup({
  children,
  value: propsValue,
  onChange,
}: RadioGroupProps) {
  const [value, setValue] = useState(propsValue ? propsValue : '')

  const handleChange = (e: string) => {
    if (onChange) onChange(e)
    setValue(e)
  }

  return (
    <RadixDropdown.RadioGroup value={value} onValueChange={handleChange}>
      {children}
    </RadixDropdown.RadioGroup>
  )
}

interface LabelProps {
  children: React.ReactNode
}

export function Label({ children }: LabelProps) {
  let __styles = styleHandler('dropdown')

  return (
    <RadixDropdown.Label className={__styles.label}>
      {children}
    </RadixDropdown.Label>
  )
}

Dropdown.Item = Item
Dropdown.Misc = Misc
Dropdown.Checkbox = Checkbox
Dropdown.Radio = Radio
Dropdown.RadioGroup = RadioGroup
Dropdown.Label = Label
Dropdown.Seperator = Seperator
Dropdown.RightSlot = RightSlot
export default Dropdown
