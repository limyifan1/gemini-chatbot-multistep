'use client'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import React, { useEffect, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'
import { nanoid } from 'nanoid'
import { Rule } from '@/lib/types'
import { getRules, removeRule, saveRule } from '@/app/actions'

export const RulesList = ({
  userId
  // rules
}: {
  userId: string
  // rules: Rule[]
}) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { formRef, onKeyDown } = useEnterSubmit()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rules, setRules] = useState<Rule[] | undefined>(undefined)

  const fetchRules = async () => {
    const data = await getRules(userId)
    setRules(data)
  }

  useEffect(() => {
    fetchRules()
  }, [])

  return (
    <main className="flex flex-col p-4">
      <form
        ref={formRef}
        onSubmit={async (e: any) => {
          e.preventDefault()
          console.log('submit', title, content)
          await saveRule({
            content,
            title,
            id: nanoid(),
            createdAt: new Date(),
            userId
          })
          await fetchRules()
          setTitle('')
          setContent('')
        }}
      >
        <div className="text-2xl font-bold text-zinc-900 mb-6">Rules</div>
        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden px-12 sm:px-12 gap-2 mb-4">
          <div className="text-xl font-bold text-zinc-900">Create Rule</div>
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Rule Title"
            className="bg-zinc-100 min-h-[60px] w-full placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="title"
            rows={1}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Rule Details"
            className="bg-zinc-100 min-h-[60px] w-full placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="rule"
            rows={5}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            disabled={title === '' || content === ''}
            className="w-full sm:w-auto bg-zinc-950 text-zinc-200 "
          >
            Create Rule <IconArrowRight />
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-4 px-12">
        <div className="text-xl font-bold text-zinc-900">Rule List</div>
        {rules?.map(rule => (
          <div
            key={rule.id}
            className="flex flex-col gap-2 p-4 bg-zinc-100 rounded-md"
          >
            <div className="text-lg font-bold text-zinc-900">{rule.title}</div>
            <div className="text-zinc-900">{rule.content}</div>
            <div className=" flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    className="text-zinc-200 w-16"
                    onClick={async () => {
                      await removeRule({ id: rule.id })
                      await fetchRules()
                    }}
                  >
                    Delete
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Rule</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
