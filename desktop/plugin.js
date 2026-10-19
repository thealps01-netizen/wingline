import { host, usePluginI18n } from '@hermes/plugin-sdk'
import { jsx, jsxs } from 'react/jsx-runtime'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const ID = 'wingline'
const ROUTE = '/wingline'
const POLL_MS = 5000
const GAP = 360
const KANBAN = '/api/plugins/kanban'
const VIEW_KEY = 'view'
const BOARD_KEY = 'board'
const LOG_TAIL = 131072
const BOX = { needs: 460, working: 260, pipeline: 420, timeline: 460, drawer: 760, error: 132, log: 300, problems: 132, dialog: 720 }
const ROLES = ['builder', 'review', 'gate', 'detective']
const ROLE_TONE = { builder: 'var(--ui-blue)', review: 'var(--ui-purple)', gate: 'var(--ui-orange)', detective: 'var(--ui-cyan)' }
const STATUS_KEYS = ['blocked', 'running', 'todo', 'ready', 'triage', 'scheduled', 'review', 'done', 'archived']
const STATUS_TONE = { blocked: 'var(--ui-yellow)', running: 'var(--ui-accent)', done: 'var(--ui-green)', archived: 'var(--ui-text-quaternary)' }
const FILTERS = { needs: ['blocked'], working: ['running'], queued: ['todo', 'ready', 'triage'], done: ['done'] }
const OK_OUTCOMES = ['completed', 'ok', 'done', 'review_requested']
const PAUSE_OUTCOMES = ['blocked', 'changes_requested', 'needs_input']
let ctxRef = null

const BUNDLES = {
  en: {
    wingline: {
      title: 'Wingline',
      subtitle: 'Your Kanban boards, from the human side',
      nav: 'Wingline',
      boardPick: 'Kanban board',
      view: { label: 'View', board: 'Board', factory: 'Factory' },
      count: { needs: 'Needs you', working: 'Working', queued: 'Queued', done: 'Done', spend: 'Spend', filter: label => `Show only ${label} in the timeline` },
      updated: s => `Updated ${s}`,
      loading: 'Loading the board…',
      empty: 'This board has no tasks yet.',
      tryAgain: 'Try again',
      unit: { s: n => `${n} s`, min: n => `${n} min`, hm: (h, m) => (m ? `${h}h ${m}m` : `${h}h`) },
      problems: {
        title: n => (n === 1 ? '1 problem reading or changing the board' : `${n} problems reading or changing the board`),
        dismiss: 'Dismiss',
        overview: 'Reading the board',
        backend: s => `Wingline backend (${s})`
      },
      needs: {
        title: 'Needs you',
        none: 'Nothing is waiting for you.',
        count: n => (n === 1 ? '1 task' : `${n} tasks`),
        reasonUnknown: 'Hermes stopped this task without a reason on record.',
        retries: (a, b) => `Retries used ${a}/${b}`,
        retriesNoMax: a => `Retries used ${a}`,
        worked: d => `${d} worked`,
        stopped: s => `stopped ${s}`,
        attempts: n => (n === 1 ? '1 attempt' : `${n} attempts`)
      },
      working: {
        title: 'Working now',
        none: 'No worker is running.',
        lastStop: s => `The last one stopped ${s}. New work starts here when a task is ready.`,
        nothingYet: 'Nothing has run on this board yet.',
        elapsed: d => `running for ${d}`,
        limit: d => `limit ${d}`,
        noActivity: 'No activity reported yet.',
        ago: d => `${d} ago`
      },
      pipe: { title: 'Pipeline', sub: 'parents → children', none: 'No task on this board waits for another.' },
      tl: {
        title: 'Timeline',
        sub: 'every attempt · idle stretches squeezed, working time at true length',
        task: 'Task',
        spent: 'Spent',
        other: 'Other tasks',
        group: (n, money) => `${n === 1 ? '1 task' : `${n} tasks`} · ${money}`,
        roles: 'Roles:'
      },
      role: { builder: 'Builder', review: 'Reviewer', gate: 'Gate', detective: 'Investigator' },
      status: {
        blocked: 'Needs you',
        running: 'Working',
        todo: 'To do',
        ready: 'Ready',
        triage: 'Triage',
        scheduled: 'Scheduled',
        review: 'In review',
        done: 'Done',
        archived: 'Archived',
        other: 'Other'
      },
      run: {
        ok: 'finished',
        stopped: 'stopped',
        outcome: o => `Hermes recorded: ${o}`,
        paused: 'paused for input',
        running: 'running',
        attempt: n => `Attempt ${n}`,
        took: d => `took ${d}`,
        limitHit: d => `Stopped by its time limit (${d}).`,
        pastLimit: (d, o) => `Ran past its time limit (${d}); Hermes recorded the end as ${o}, not as a time-out.`
      },
      cost: { estimated: 'estimated', actual: 'billed', mixed: 'partly estimated', none: 'no cost recorded' },
      dr: {
        pick: 'Pick a task to see its details.',
        spent: 'Spent',
        work: 'Working time',
        attempts: 'Attempts',
        comments: 'Comments',
        assignee: 'Assignee',
        role: 'Role',
        limit: 'Time limit',
        retries: 'Retries used',
        created: 'Created',
        waits: 'Waits for',
        unlocks: 'Unlocks',
        nothing: 'nothing',
        activity: 'Now',
        why: 'Why it needs you',
        error: 'Last error',
        raw: 'Error as stored',
        noRuns: 'Not started yet.',
        noLimit: 'none set',
        close: 'Close details',
        note: 'Note for the next worker',
        notePh: 'Add a note…',
        log: 'Worker log',
        logLoading: 'Reading the log…',
        logNone: 'No log: this task never started a worker.',
        logEmpty: 'The log is empty.',
        logClose: 'Hide log',
        logTrunc: 'Showing the end of the log.',
        logFailed: m => `The log could not be read: ${m}`
      },
      act: {
        retry: 'Retry with more time',
        log: 'Open log',
        kanban: 'Open in Kanban',
        chat: 'Ask in chat',
        archive: 'Archive',
        note: 'Add note'
      },
      chat: {
        prompt: (id, title, board, status, reason) =>
          `About Kanban task ${id} "${title}" on board ${board} (status: ${status}). ${reason} What should I do next?`,
        inserted: 'The question is in the chat composer.',
        copied: 'No chat composer answered, so the question was copied to the clipboard. Paste it into a chat.',
        failed: 'Could not reach the chat composer or the clipboard.'
      },
      dlg: {
        cancel: 'Cancel',
        close: 'Close',
        retryTitle: 'Retry with more time',
        retryWhy: "Hermes cannot change an existing task's time limit, so a new task is used: Wingline creates it and retires this one.",
        limit: 'New time limit (hours)',
        limitOld: d => `Old limit: ${d}. The default is twice the old one, rounded to 30 minutes.`,
        limitNone: 'This task had no time limit. The default is 2 hours.',
        limitBad: 'Enter a time limit of at least 0.5 hours.',
        willHappen: 'These changes happen on the board, in this order:',
        retriesNote: 'The Kanban API does not accept a retry count when it creates a task, so the new task uses the board default for retries.',
        retryGo: d => `Create the new task (${d})`,
        stepRead: id => `Read ${id} from Hermes Kanban.`,
        stepCreate: d =>
          `Create a new task with the same title, body, assignee, priority, parents, skills, goal mode, model/provider/reasoning overrides and workspace (also tenant and project), time limit ${d}.`,
        stepLink: c => `Link the new task to child ${c}, so ${c} waits for the new task.`,
        stepUnlink: (o, c) => `Remove the old link ${o} → ${c}.`,
        stepComment: o => `Add a comment on ${o} naming the new task's id.`,
        stepArchive: o => `Archive ${o}.`,
        noChildren: 'No children to re-link: no task waits for this one.',
        newId: id => `New task: ${id}`,
        state: { pending: 'Not done', running: 'Working…', done: 'Done', failed: 'Failed' },
        retryOk: id => `Done. The new task is ${id}; the old one is archived.`,
        stoppedAt: 'Stopped at the first failure. Steps marked Done already happened on the board; nothing after the failed step ran.',
        retryComment: (id, d) => `Wingline retried this task as ${id} with a time limit of ${d}; this task is archived.`,
        noteTitle: 'Add a note',
        noteWill: id => `Adds this comment to ${id}, signed "wingline". The next worker on the task reads it.`,
        noteEmpty: 'Write a note first.',
        noteOk: 'The note was added.',
        archiveTitle: 'Archive this task?',
        archiveWill: id =>
          `${id} moves to the archived status. It stays readable under archived and can be found again with Kanban's archived filter; nothing is deleted.`,
        archiveNext: 'Continue',
        archiveSure: 'Yes, archive it',
        archiveSecond: 'Second step: confirm once more to archive.',
        archiveOk: 'The task was archived.',
        failed: m => `Failed: ${m}`
      },
      fx: {
        aria: 'Production line: tasks as packages moving through machines',
        live: 'Live',
        replay: s => `Replay · ${s}×`,
        paused: 'Replay · paused',
        idle: 'Line idle — nothing running right now',
        running: n => (n === 1 ? '1 machine running' : `${n} machines running`),
        working: n => `${n} working`,
        play: 'Play replay',
        pause: 'Pause replay',
        now: 'Now',
        nowTip: 'Jump to the live state',
        speed: 'Replay speed',
        scrub: 'Replay position',
        zone: {
          intake: 'INTAKE',
          build: 'BUILD',
          review: 'REVIEW · 4 SCANNERS',
          merge: 'MERGE → GATE',
          shipped: 'SHIPPED',
          archived: 'ARCHIVED',
          investigate: 'INVESTIGATE'
        },
        machine: { pressA: 'Press A', pressB: 'Press B', scan: n => `Scanner ${n}`, gate: 'Gate stamp', lab: 'Detective lab' },
        jam: 'Jammed — needs you',
        pause: 'Paused — needs input',
        bin: n => `NEEDS YOU · ${n}`,
        clear: 'All clear — nothing waiting on you',
        queueEmpty: 'Queue empty',
        none: 'none',
        crates: n => (n === 1 ? '1 crate' : `${n} crates`),
        shipped: 'shipped · their cost',
        inputs: (a, b) => `${a}/${b} inputs`,
        callLimit: 'STOPPED · TIME LIMIT',
        callCrash: 'STOPPED · CRASHED',
        callStop: 'STOPPED',
        callPause: 'PAUSED · WAITING FOR INPUT',
        callMeta: (d, n, money) => `${d} worked · ${n === 1 ? '1 attempt' : `${n} attempts`} · ${money}`,
        decide: 'Click to decide →',
        more: n => `+${n}`,
        where: {
          intake: 'queued',
          wait: 'queued, waiting for its inputs',
          machine: m => `working at ${m}`,
          crash: 'stopped — needs you',
          pause: 'paused — needs input',
          dock: 'shipped (done)',
          scrap: 'archived'
        },
        pkg: (title, where) => `${title} — ${where}`,
        mIdle: m => `${m}: idle`,
        mWork: (m, x) => `${m}: working on ${x}`,
        mJam: (m, x) => `${m}: stopped on ${x}`,
        noTask: m => `${m} has not processed a task yet at this point.`,
        replayAt: s => `In replay at ${s}`
      },
      err: {
        noBridge: 'The Hermes desktop bridge is not available, so Wingline cannot reach the Kanban API.',
        noRest: 'The plugin REST door is not available.',
        shape: 'The board answer did not contain a task list.',
        noId: 'Hermes did not return the new task id.',
        refused: 'Hermes answered but did not make the change.'
      }
    }
  }
}

function h(type, props, ...kids) {
  const { key, ...rest } = props || {}
  if (!kids.length) return jsx(type, rest, key)
  if (kids.length === 1) return jsx(type, { ...rest, children: kids[0] }, key)
  return jsxs(type, { ...rest, children: kids }, key)
}

const isNum = v => typeof v === 'number' && Number.isFinite(v)
const enc = encodeURIComponent
const money = v => `$${(isNum(v) ? v : 0).toFixed(2)}`
const roleOf = task => (ROLES.includes(task?.role) ? task.role : 'builder')
const runsOf = task => (Array.isArray(task?.runs) ? task.runs.filter(r => r && isNum(r.started_at)) : [])
const runEnd = (r, now) => (isNum(r.ended_at) ? r.ended_at : now)
const workSeconds = (task, now) => runsOf(task).reduce((s, r) => s + Math.max(0, runEnd(r, now) - r.started_at), 0)
const lastRun = task => {
  const rs = runsOf(task)
  return rs.length ? rs[rs.length - 1] : null
}
const errText = err => String(err?.message || err || '')
const statusKey = s => (STATUS_KEYS.includes(s) ? s : 'other')

function runKind(r) {
  if (!isNum(r?.ended_at)) return 'running'
  const o = String(r.outcome || r.status || '')
  if (OK_OUTCOMES.includes(o)) return 'ok'
  if (PAUSE_OUTCOMES.includes(o)) return 'paused'
  return 'stopped'
}

function stripAnsi(s) {
  return String(s ?? '')
    .replace(/\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g, '')
    .replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, '')
    .replace(/\u001b[@-_]/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
}

function fmtDur(t, s) {
  if (!isNum(s) || s < 0) return '—'
  if (s < 90) return t('wingline.unit.s', Math.round(s))
  if (s < 5400) return t('wingline.unit.min', Math.round(s / 60))
  const m = Math.round(s / 60)
  return t('wingline.unit.hm', Math.floor(m / 60), m % 60)
}

function fmtWhen(sec) {
  if (!isNum(sec)) return '—'
  const d = new Date(sec * 1000)
  const day = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  return `${day} ${time}`
}

function fmtClock(sec) {
  if (!isNum(sec)) return ['—', '--:--']
  const d = new Date(sec * 1000)
  return [
    d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  ]
}

function readStore(key, fallback) {
  try {
    return ctxRef?.storage?.get?.(key, fallback) ?? fallback
  } catch (err) {
    console.warn(`[${ID}] could not read ${key} from plugin storage`, err)
    return fallback
  }
}

function writeStore(key, value) {
  try {
    ctxRef?.storage?.set?.(key, value)
  } catch (err) {
    console.warn(`[${ID}] could not keep ${key} in plugin storage`, err)
  }
}

async function kanbanCall(path, board, opts = {}) {
  const api = typeof window !== 'undefined' ? window.hermesDesktop?.api : null
  if (typeof api !== 'function') throw new Error(BUNDLES.en.wingline.err.noBridge)
  const sep = path.includes('?') ? '&' : '?'
  const request = { path: `${KANBAN}${path}${board ? `${sep}board=${enc(board)}` : ''}`, method: opts.method || 'GET' }
  if (opts.body !== undefined) request.body = opts.body
  return api(request)
}

function buildAxis(tasks, now) {
  const spans = []
  const pts = new Set()
  for (const task of tasks) {
    if (isNum(task.created_at)) pts.add(task.created_at)
    for (const r of runsOf(task)) {
      const e = runEnd(r, now)
      spans.push([r.started_at, e])
      pts.add(r.started_at)
      pts.add(e)
    }
  }
  const p = [...pts].sort((a, b) => a - b)
  if (p.length < 2) {
    const a = p.length ? p[0] : now
    p.splice(0, p.length, a - 60, a)
  }
  const w = [0]
  for (let i = 1; i < p.length; i++) {
    const d = p[i] - p[i - 1]
    const busy = spans.some(([a, b]) => a <= p[i - 1] && b >= p[i])
    w.push(busy ? d : Math.min(d, GAP))
  }
  const cum = [0]
  for (let i = 1; i < p.length; i++) cum.push(cum[i - 1] + w[i])
  const span = cum[cum.length - 1] || 1
  const toC = x => {
    if (x <= p[0]) return 0
    for (let i = 1; i < p.length; i++) {
      if (x <= p[i]) {
        const d = p[i] - p[i - 1]
        return cum[i - 1] + (d ? (x - p[i - 1]) / d : 0) * w[i]
      }
    }
    return span
  }
  const toR = c => {
    for (let i = 1; i < p.length; i++) {
      if (c <= cum[i]) {
        const s = cum[i] - cum[i - 1]
        return p[i - 1] + (s ? (c - cum[i - 1]) / s : 0) * (p[i] - p[i - 1])
      }
    }
    return p[p.length - 1]
  }
  return { start: p[0], end: p[p.length - 1], span, toC, toR }
}

function components(tasks) {
  const ids = new Set(tasks.map(x => x.id))
  const up = new Map(tasks.map(x => [x.id, x.id]))
  const find = a => {
    while (up.get(a) !== a) {
      up.set(a, up.get(up.get(a)))
      a = up.get(a)
    }
    return a
  }
  const join = (a, b) => {
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) up.set(ra, rb)
  }
  for (const x of tasks) {
    for (const p of x.parents || []) if (ids.has(p)) join(x.id, p)
    for (const c of x.children || []) if (ids.has(c)) join(x.id, c)
  }
  const out = new Map()
  for (const x of tasks) {
    const r = find(x.id)
    if (!out.has(r)) out.set(r, [])
    out.get(r).push(x)
  }
  return [...out.values()]
}

function commonPrefix(titles) {
  if (!titles.length) return ''
  const split = titles.map(s => String(s || '').split(' '))
  const out = []
  for (let i = 0; i < split[0].length; i++) {
    const word = split[0][i]
    if (split.some(p => p[i] !== word)) break
    out.push(word)
  }
  return out.join(' ').replace(/[:\s]+$/, '')
}

const firstStart = task => {
  const r = runsOf(task)[0]
  return r ? r.started_at : isNum(task.created_at) ? task.created_at : 0
}

function timelineGroups(tasks, t) {
  const comps = components(tasks)
  const groups = []
  const singles = []
  for (const c of comps) {
    if (c.length > 1) groups.push({ name: commonPrefix(c.map(x => x.title)) || c[0].title, tasks: c })
    else singles.push(c[0])
  }
  const byWord = new Map()
  for (const x of singles) {
    const word = String(x.title || '').split(' ')[0].toLowerCase()
    if (!byWord.has(word)) byWord.set(word, [])
    byWord.get(word).push(x)
  }
  const rest = []
  for (const [word, list] of byWord) {
    if (list.length > 1 && word) groups.push({ name: commonPrefix(list.map(x => x.title)) || word, tasks: list })
    else rest.push(...list)
  }
  if (rest.length) groups.push({ name: t('wingline.tl.other'), tasks: rest, other: true })
  for (const g of groups) g.tasks.sort((a, b) => firstStart(a) - firstStart(b))
  groups.sort((a, b) => (a.other ? 1 : 0) - (b.other ? 1 : 0) || firstStart(a.tasks[0]) - firstStart(b.tasks[0]))
  return groups
}

const NODE = { w: 200, h: 52, gx: 110, gy: 10, pad: 16, gap: 26 }

function pipelineLayout(tasks) {
  const byId = new Map(tasks.map(x => [x.id, x]))
  const comps = components(tasks).filter(c => c.length > 1)
  const nodes = []
  const edges = []
  let top = NODE.pad
  let width = 0
  for (const comp of comps) {
    const depth = new Map()
    const visiting = new Set()
    const depthOf = x => {
      if (depth.has(x.id)) return depth.get(x.id)
      if (visiting.has(x.id)) return 0
      visiting.add(x.id)
      const ps = (x.parents || []).map(p => byId.get(p)).filter(Boolean)
      const d = ps.length ? Math.max(...ps.map(depthOf)) + 1 : 0
      visiting.delete(x.id)
      depth.set(x.id, d)
      return d
    }
    comp.forEach(depthOf)
    const cols = []
    for (const x of [...comp].sort((a, b) => firstStart(a) - firstStart(b))) {
      const d = depth.get(x.id)
      if (!cols[d]) cols[d] = []
      cols[d].push(x)
    }
    const prefix = commonPrefix(comp.map(x => x.title))
    const rows = Math.max(...cols.map(c => (c ? c.length : 0)))
    const compH = rows * NODE.h + (rows - 1) * NODE.gy
    cols.forEach((col, d) => {
      if (!col) return
      const colH = col.length * NODE.h + (col.length - 1) * NODE.gy
      col.forEach((x, k) => {
        const label = prefix && String(x.title).length > prefix.length + 1 ? String(x.title).slice(prefix.length).trim() : x.title
        nodes.push({ task: x, label, x: NODE.pad + d * (NODE.w + NODE.gx), y: top + (compH - colH) / 2 + k * (NODE.h + NODE.gy) })
      })
      width = Math.max(width, NODE.pad * 2 + (d + 1) * NODE.w + d * NODE.gx)
    })
    top += compH + NODE.gap
  }
  const at = new Map(nodes.map(n => [n.task.id, n]))
  for (const n of nodes) {
    for (const p of n.task.parents || []) {
      const from = at.get(p)
      if (from) edges.push({ key: `${p}>${n.task.id}`, from, to: n })
    }
  }
  return { nodes, edges, width, height: top - NODE.gap + NODE.pad }
}

const LANES = [300, 400, 500, 600]
const MACHINES = [
  { key: 'pressA', kind: 'press', role: 'builder', x: 430, y: 230, w: 108, h: 116 },
  { key: 'pressB', kind: 'press', role: 'builder', x: 430, y: 410, w: 108, h: 116 },
  ...LANES.map((y, i) => ({ key: `scan${i + 1}`, kind: 'scan', role: 'review', x: 820, y, w: 70, h: 76, n: i + 1 })),
  { key: 'gate', kind: 'gate', role: 'gate', x: 1085, y: 450, w: 120, h: 124 },
  { key: 'lab', kind: 'lab', role: 'detective', x: 478, y: 770, w: 132, h: 96 }
]
const POOL = { builder: ['pressA', 'pressB'], review: ['scan1', 'scan2', 'scan3', 'scan4'], gate: ['gate'], detective: ['lab'] }
const BELTS = [
  [[226, 450], [290, 450]],
  [[290, 450], [290, 230], [540, 230], [540, 130], [1500, 130], [1500, 205]],
  [[290, 410], [540, 410], [540, 230]],
  [[290, 450], [290, 680], [670, 680], [670, 300]],
  [[290, 680], [290, 770], [420, 770]],
  ...LANES.map(y => [[670, y], [1000, y]]),
  [[1000, 300], [1000, 450]],
  [[1000, 600], [1000, 450]],
  [[1000, 450], [1290, 450]]
]
const RED_BELT = [[548, 770], [1110, 770]]
const CABLES = ['M486,262 C590,262 620,300 662,300', 'M486,440 C600,440 640,470 662,470']
const ZONE = {
  intake: { x: 40, y: 300, w: 186, h: 300 },
  dock: { x: 1290, y: 190, w: 272, h: 376 },
  bay: { x: 1110, y: 612, w: 452, h: 200 },
  scrap: { x: 48, y: 676, w: 166, h: 140 }
}
const CAP = { intake: 10, dock: 42, bay: 4, scrap: 12 }
const ptsAttr = list => list.map(p => p.join(',')).join(' ')

function archivedAt(task) {
  const r = lastRun(task)
  if (r) return runEnd(r, r.started_at) + 600
  return isNum(task.created_at) ? task.created_at : 0
}

function zoneAt(task, T) {
  if (T == null) {
    const s = task.status
    if (s === 'running') return 'machine'
    if (s === 'blocked') return 'bay'
    if (s === 'done') return 'dock'
    if (s === 'archived') return 'scrap'
    return 'intake'
  }
  const runs = runsOf(task)
  const born = isNum(task.created_at) ? task.created_at : runs.length ? runs[0].started_at : null
  if (born == null || born > T) return 'hidden'
  if (task.status === 'archived' && T >= archivedAt(task)) return 'scrap'
  const started = runs.filter(r => r.started_at <= T)
  if (started.some(r => !isNum(r.ended_at) || r.ended_at > T)) return 'machine'
  if (task.status === 'done' && isNum(task.completed_at) && T >= task.completed_at) return 'dock'
  const last = started[started.length - 1]
  if (!last) return 'intake'
  return runKind(last) === 'ok' ? 'dock' : 'bay'
}

function jamKind(task, T) {
  const runs = runsOf(task).filter(r => isNum(r.ended_at) && (T == null || r.ended_at <= T))
  const last = runs[runs.length - 1]
  return last && runKind(last) === 'stopped' ? 'crash' : 'pause'
}

function slot(zone, i) {
  if (zone === 'intake') return [86 + (i % 2) * 64, 372 + Math.floor(i / 2) * 48]
  if (zone === 'dock') return [1322 + (i % 6) * 41 + (Math.floor(i / 6) % 2) * 10, 530 - Math.floor(i / 6) * 46]
  if (zone === 'bay') return [1168 + i * 76, 742]
  return [96 + (i % 3) * 38, 778 - Math.floor(i / 3) * 12]
}

function layoutFactory(tasks, T) {
  const zones = { intake: [], machine: [], bay: [], dock: [], scrap: [] }
  const zoneOf = {}
  for (const task of tasks) {
    const z = zoneAt(task, T)
    zoneOf[task.id] = z
    if (z !== 'hidden') zones[z].push(task)
  }
  const endOf = x => {
    const r = lastRun(x)
    return r ? runEnd(r, r.started_at) : isNum(x.created_at) ? x.created_at : 0
  }
  zones.intake.sort((a, b) => (a.created_at || 0) - (b.created_at || 0))
  zones.machine.sort((a, b) => firstStart(a) - firstStart(b))
  zones.bay.sort((a, b) => endOf(a) - endOf(b))
  zones.dock.sort((a, b) => endOf(a) - endOf(b))
  zones.scrap.sort((a, b) => endOf(a) - endOf(b))
  const occ = {}
  const pos = {}
  const kinds = {}
  for (const task of zones.machine) {
    const pool = POOL[roleOf(task)]
    const free = pool.find(k => !occ[k])
    const key = free || pool[pool.length - 1]
    if (!occ[key]) occ[key] = { task, state: 'work', extra: [] }
    else occ[key].extra.push(task)
    const m = MACHINES.find(x => x.key === key)
    const k = free ? 0 : occ[key].extra.length
    pos[task.id] = [m.x + k * 14, m.y - k * 6]
  }
  for (const task of zones.bay) {
    const kind = jamKind(task, T)
    kinds[task.id] = kind
    const pool = POOL[roleOf(task)]
    const free = pool.find(k => !occ[k])
    if (free) occ[free] = { task, state: kind, extra: [] }
  }
  const overflow = {}
  for (const z of ['intake', 'dock', 'bay', 'scrap']) {
    zones[z].forEach((task, i) => {
      if (i < CAP[z]) pos[task.id] = slot(z, i)
    })
    overflow[z] = Math.max(0, zones[z].length - CAP[z])
  }
  return { zones, zoneOf, occ, pos, kinds, overflow }
}

const ICONS = {
  clock: ['M12 7v5l3 2', 'C12,12,9'],
  alert: ['M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z', 'M12 9v4M12 17h.01'],
  retry: ['M3 12a9 9 0 0 1 15.5-6.2L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-15.5 6.2L3 16', 'M3 21v-5h5'],
  log: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z', 'M14 3v5h5M9 13h6M9 17h4'],
  chat: ['M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z'],
  archive: ['M3 4h18v4H3z', 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4'],
  coin: ['M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2', 'C12,12,9'],
  board: ['M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z'],
  moon: ['M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'],
  info: ['M12 11v5M12 8h.01', 'C12,12,9'],
  note: ['M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z'],
  user: ['M20 21a8 8 0 0 0-16 0', 'C12,8,4'],
  play: ['M7 5v14l11-7z'],
  pause: ['M8 5v14M16 5v14'],
  close: ['M6 6l12 12M18 6 6 18']
}

function Icon({ name, size = 15 }) {
  const parts = ICONS[name] || []
  return h(
    'svg',
    { className: 'wl-i', width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' },
    parts.map((d, i) => {
      if (d.startsWith('C')) {
        const [cx, cy, r] = d.slice(1).split(',').map(Number)
        return h('circle', { key: i, cx, cy, r })
      }
      return h('path', { key: i, d })
    })
  )
}

function Btn({ icon, label, onClick, kind, disabled, id }) {
  return h(
    'button',
    { type: 'button', className: `wl-btn${kind ? ` is-${kind}` : ''}`, onClick, disabled, 'data-act': id },
    icon ? h(Icon, { name: icon }) : null,
    h('span', null, label)
  )
}

const CSS = `
.wl-root{container:wl/inline-size;position:relative;min-height:100%;box-sizing:border-box;padding:0 0 28px;color:var(--ui-text-primary);background:var(--ui-bg-chrome);font-size:13px;line-height:1.5}
.wl-root *{box-sizing:border-box}
.wl-root button{font:inherit;color:inherit;cursor:pointer}
.wl-root :focus-visible{outline:2px solid var(--ui-accent);outline-offset:2px;border-radius:6px}
.wl-i{flex:none;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.wl-num{font-variant-numeric:tabular-nums}
.wl-top{position:sticky;top:0;z-index:6;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:12px 20px;background:var(--ui-bg-chrome);border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-brand{display:flex;flex-direction:column;min-width:0}
.wl-brand h1{margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}
.wl-brand span{font-size:12px;color:var(--ui-text-tertiary)}
.wl-select{height:30px;max-width:220px;padding:0 8px;border-radius:8px;border:1px solid var(--ui-stroke-secondary);background:var(--ui-bg-editor);color:var(--ui-text-primary);font:inherit}
.wl-seg{display:inline-flex;gap:2px;padding:3px;background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);border-radius:10px}
.wl-seg button{border:0;background:none;padding:4px 12px;border-radius:7px;color:var(--ui-text-secondary);font-weight:500}
.wl-seg button:hover{color:var(--ui-text-primary)}
.wl-seg button[aria-pressed=true]{background:var(--ui-bg-elevated);color:var(--ui-text-primary)}
.wl-counts{display:flex;flex-wrap:wrap;gap:4px;margin-left:auto}
.wl-count{display:inline-flex;align-items:center;gap:7px;padding:4px 10px;border-radius:9px;border:1px solid transparent;background:none;color:var(--ui-text-secondary);font-size:12.5px}
.wl-count b{color:var(--ui-text-primary);font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-count:hover{background:var(--ui-bg-secondary);border-color:var(--ui-stroke-tertiary)}
.wl-count[aria-pressed=true]{background:var(--ui-bg-secondary);border-color:var(--ui-stroke-secondary)}
.wl-count.is-alert{border-color:color-mix(in srgb,var(--ui-yellow) 45%,transparent);background:color-mix(in srgb,var(--ui-yellow) 9%,transparent)}
.wl-count .wl-dot{width:8px;height:8px;border-radius:50%}
.wl-count.is-static{cursor:default}
.wl-count.is-static:hover{background:none;border-color:transparent}
.wl-updated{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap}
.wl-problems{margin:12px 20px 0;padding:10px 14px;border-radius:10px;border:1px solid color-mix(in srgb,var(--ui-red) 45%,transparent);background:color-mix(in srgb,var(--ui-red) 8%,var(--ui-bg-chrome));max-height:${BOX.problems}px;overflow:auto}
.wl-problems-head{display:flex;align-items:center;gap:10px;font-weight:600}
.wl-problems-head .wl-i{stroke:var(--ui-red)}
.wl-problems ul{margin:6px 0 0;padding-left:24px;font-size:12.5px;color:var(--ui-text-secondary)}
.wl-problems li{overflow-wrap:anywhere}
.wl-problems li b{color:var(--ui-text-primary);font-weight:600}
.wl-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:9px;background:var(--ui-bg-tertiary);border:1px solid var(--ui-stroke-secondary);color:var(--ui-text-primary);font-size:12.5px;font-weight:500;white-space:nowrap}
.wl-btn:hover{background:var(--ui-control-hover-background)}
.wl-btn.is-primary{background:var(--ui-text-primary);border-color:var(--ui-text-primary);color:var(--ui-bg-chrome)}
.wl-btn.is-primary:hover{opacity:.9;background:var(--ui-text-primary)}
.wl-btn.is-danger{background:var(--ui-red);border-color:var(--ui-red);color:var(--ui-bg-chrome)}
.wl-btn.is-ghost{background:none;border-color:transparent;color:var(--ui-text-secondary)}
.wl-btn.is-ghost:hover{background:var(--ui-bg-tertiary);color:var(--ui-text-primary)}
.wl-btn[disabled]{opacity:.45;cursor:default}
.wl-state{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin:24px 20px;padding:18px 20px;border-radius:12px;border:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-secondary);color:var(--ui-text-secondary)}
.wl-board{display:grid;grid-template-columns:minmax(0,1fr);gap:20px;padding:20px}
@container wl (min-width:1040px){.wl-board{grid-template-columns:minmax(0,1fr) 360px}}
.wl-main{min-width:0;display:flex;flex-direction:column;gap:26px}
.wl-h2{margin:0 0 10px;font-size:14px;font-weight:600;display:flex;align-items:baseline;gap:10px;letter-spacing:-.01em}
.wl-h2 small{font-weight:400;color:var(--ui-text-tertiary);font-size:12px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-panel{background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);border-radius:12px;min-width:0}
.wl-needs{display:flex;flex-direction:column;gap:10px;max-height:${BOX.needs}px;overflow:auto}
.wl-attn{flex:none;display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;padding:16px 18px;cursor:pointer;border-color:color-mix(in srgb,var(--ui-yellow) 40%,var(--ui-stroke-tertiary));background:linear-gradient(180deg,color-mix(in srgb,var(--ui-yellow) 9%,transparent),transparent 70%),var(--ui-bg-secondary)}
.wl-attn.is-sel{border-color:var(--ui-yellow)}
.wl-badge{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--ui-yellow) 14%,transparent);border:1px solid color-mix(in srgb,var(--ui-yellow) 40%,transparent)}
.wl-badge .wl-i{stroke:var(--ui-yellow)}
.wl-attn h3{margin:0;font-size:15px;font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.wl-reason{margin:6px 0 0;max-width:80ch;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow-wrap:anywhere}
.wl-facts{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:10px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-facts span{display:inline-flex;align-items:center;gap:5px}
.wl-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.wl-empty{display:flex;align-items:center;gap:10px;padding:14px 16px;color:var(--ui-text-secondary)}
.wl-empty b{color:var(--ui-text-primary);font-weight:600}
.wl-work{display:flex;flex-direction:column;gap:8px;max-height:${BOX.working}px;overflow:auto}
.wl-wrow{flex:none;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;padding:12px 14px;cursor:pointer}
.wl-wrow.is-sel{border-color:var(--ui-accent)}
.wl-wtitle{display:flex;align-items:center;gap:8px;min-width:0;font-weight:600}
.wl-wtitle span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-wmeta{font-size:12px;color:var(--ui-text-tertiary);white-space:nowrap}
.wl-wact{grid-column:1/-1;font-size:12px;color:var(--ui-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-bar{grid-column:1/-1;height:4px;border-radius:2px;background:var(--ui-bg-tertiary);overflow:hidden}
.wl-bar i{display:block;height:100%;background:var(--ui-accent)}
.wl-pipe{padding:10px 6px 6px;overflow:auto;max-height:${BOX.pipeline}px}
.wl-pipe svg{display:block}
.wl-node{cursor:pointer;outline:none}
.wl-card{fill:var(--ui-bg-tertiary);stroke:var(--ui-stroke-secondary);stroke-width:1}
.wl-node:hover .wl-card,.wl-node:focus-visible .wl-card,.wl-node.is-sel .wl-card{stroke:var(--ui-accent);stroke-width:1.5}
.wl-edge{stroke:var(--ui-stroke-primary);stroke-width:1.5;fill:none}
.wl-arrow{fill:var(--ui-stroke-primary)}
.wl-nt{height:100%;padding:7px 12px 0 26px;font-size:12.5px;line-height:1.35;pointer-events:none}
.wl-nt b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-nt span{display:block;color:var(--ui-text-tertiary);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.wl-tl{padding:6px 0 0}
.wl-tl-head,.wl-tl-row{display:grid;grid-template-columns:minmax(120px,240px) minmax(0,1fr) 64px;gap:12px;align-items:center}
.wl-tl-head{font-size:11px;color:var(--ui-text-tertiary);height:28px;padding:0 18px;border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-ticks{position:relative;height:100%}
.wl-ticks span{position:absolute;top:6px;white-space:nowrap;transform:translateX(-50%)}
.wl-ticks span:first-child{transform:none}
.wl-ticks span:last-child{transform:translateX(-100%)}
.wl-tl-body{max-height:${BOX.timeline}px;overflow:auto;padding-bottom:4px}
.wl-tl-group{padding:10px 18px 4px;font-size:12px;font-weight:600;color:var(--ui-text-secondary);display:flex;gap:8px;min-width:0}
.wl-tl-group em{font-style:normal;font-weight:400;color:var(--ui-text-tertiary);white-space:nowrap}
.wl-tl-row{height:32px;cursor:pointer;border-radius:8px;margin:0 4px;padding:0 14px}
.wl-tl-row:hover{background:var(--ui-row-hover-background)}
.wl-tl-row.is-sel{background:var(--ui-row-active-background)}
.wl-tl-row.is-dim{opacity:.35}
.wl-tl-name{display:flex;align-items:center;gap:8px;min-width:0}
.wl-tl-name span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-role{width:8px;height:8px;border-radius:2px;flex:none;display:inline-block}
.wl-track{position:relative;height:20px}
.wl-grid{position:absolute;inset:0;background:repeating-linear-gradient(90deg,var(--ui-stroke-quaternary) 0 1px,transparent 1px 25%)}
.wl-run{position:absolute;top:5px;height:10px;border-radius:5px;min-width:4px}
.wl-k-ok{background:var(--ui-green)}
.wl-k-paused{background:var(--ui-yellow)}
.wl-k-running{background:var(--ui-accent)}
.wl-k-stopped{background:repeating-linear-gradient(-45deg,var(--ui-red) 0 4px,color-mix(in srgb,var(--ui-red) 55%,var(--ui-bg-chrome)) 4px 8px)}
.wl-cost{text-align:right;font-size:12px;color:var(--ui-text-secondary);font-variant-numeric:tabular-nums}
.wl-legend{display:flex;gap:16px;flex-wrap:wrap;padding:10px 18px;font-size:12px;color:var(--ui-text-tertiary);border-top:1px solid var(--ui-stroke-tertiary)}
.wl-legend span{display:inline-flex;align-items:center;gap:6px}
.wl-legend i{display:inline-block;width:14px;height:8px;border-radius:4px}
.wl-dr{align-self:start;position:sticky;top:72px;max-height:${BOX.drawer}px;overflow:auto;padding:18px;min-width:0;overflow-wrap:anywhere}
.wl-dr-top{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-dr-top .wl-x{margin-left:auto}
.wl-x{border:0;background:var(--ui-bg-tertiary);border-radius:8px;width:28px;height:28px;display:grid;place-items:center}
.wl-dr h3{margin:8px 0 10px;font-size:16px;font-weight:600;line-height:1.3;letter-spacing:-.01em}
.wl-status{display:inline-flex;align-items:center;gap:6px;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;background:var(--ui-bg-tertiary);border:1px solid var(--ui-stroke-tertiary)}
.wl-status i{width:7px;height:7px;border-radius:50%}
.wl-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px}
.wl-why{margin:12px 0 0;padding:10px 12px;border-radius:10px;background:color-mix(in srgb,var(--ui-yellow) 8%,var(--ui-bg-secondary));border-left:3px solid var(--ui-yellow)}
.wl-why small,.wl-sub{display:block;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ui-text-tertiary);margin-bottom:2px}
.wl-err{margin-top:8px;max-height:${BOX.error}px;overflow:auto;white-space:pre-wrap;padding:8px 10px;border-radius:8px;background:var(--ui-bg-editor);color:var(--ui-text-secondary)}
.wl-raw{margin-top:6px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-raw summary{cursor:pointer}
.wl-dl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin:14px 0;background:var(--ui-stroke-tertiary);border-radius:10px;overflow:hidden}
.wl-dl div{background:var(--ui-bg-tertiary);padding:8px 10px;min-width:0}
.wl-dl dt{font-size:11px;color:var(--ui-text-tertiary)}
.wl-dl dd{margin:2px 0 0;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-dl dd small{display:block;font-size:11px;font-weight:400;color:var(--ui-text-tertiary)}
.wl-kv{display:grid;grid-template-columns:92px minmax(0,1fr);gap:5px 10px;font-size:12.5px}
.wl-kv>span:nth-child(odd){color:var(--ui-text-tertiary)}
.wl-attempts{margin:16px 0 0;padding:0;list-style:none;position:relative}
.wl-attempts:before{content:"";position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:var(--ui-stroke-secondary)}
.wl-attempts li{position:relative;padding:0 0 12px 24px;font-size:12.5px}
.wl-attempts li i{position:absolute;left:0;top:4px;width:11px;height:11px;border-radius:50%;background:var(--ui-bg-secondary);border:2px solid var(--ui-text-tertiary)}
.wl-attempts li.is-ok i{border-color:var(--ui-green)}
.wl-attempts li.is-stopped i{border-color:var(--ui-red)}
.wl-attempts li.is-paused i{border-color:var(--ui-yellow)}
.wl-attempts li.is-running i{border-color:var(--ui-accent)}
.wl-attempts small{display:block;color:var(--ui-text-tertiary);overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
.wl-dr .wl-actions{margin-top:6px}
.wl-log{margin-top:14px}
.wl-log-head{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-weight:600}
.wl-log-head .wl-btn{margin-left:auto}
.wl-logpre{margin:0;max-height:${BOX.log}px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:10px;border-radius:10px;background:var(--ui-bg-editor);color:var(--ui-text-secondary);line-height:1.45}
.wl-note{margin-top:14px;border-top:1px solid var(--ui-stroke-tertiary);padding-top:12px}
.wl-note h4{margin:0 0 8px;font-size:13px;font-weight:600}
.wl-input{width:100%;background:var(--ui-bg-editor);border:1px solid var(--ui-stroke-secondary);border-radius:9px;padding:7px 10px;color:var(--ui-text-primary);font:inherit}
.wl-input:focus{outline:none;border-color:var(--ui-accent)}
textarea.wl-input{min-height:64px;resize:vertical}
.wl-note .wl-btn{margin-top:8px}
.wl-notice{position:fixed;right:24px;bottom:24px;z-index:40;display:flex;gap:10px;align-items:flex-start;max-width:420px;padding:12px 14px;border-radius:12px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);font-size:12.5px}
.wl-notice .wl-i{stroke:var(--ui-accent);margin-top:2px}
.wl-fx{padding:16px 20px 20px;min-width:0}
.wl-fx-bar{display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap}
.wl-pill{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:999px;border:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-secondary);font-weight:600;white-space:nowrap}
.wl-pill i{width:9px;height:9px;border-radius:50%;background:var(--ui-green)}
.wl-pill.is-replay i{background:var(--ui-blue)}
.wl-pill span{color:var(--ui-text-tertiary);font-weight:400}
.wl-clock{display:flex;flex-direction:column;line-height:1.1;padding-left:12px;border-left:1px solid var(--ui-stroke-tertiary)}
.wl-clock small{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ui-text-tertiary);font-weight:500}
.wl-clock b{font-size:18px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-stagewrap{position:relative;min-width:0}
.wl-stage{position:relative;border:1px solid var(--ui-stroke-tertiary);border-radius:14px;overflow:hidden;background:var(--ui-bg-tertiary)}
.wl-stage>svg{display:block;width:100%;height:auto;aspect-ratio:16/9;max-height:calc(100vh - 230px);min-height:320px}
.wl-ctrl{display:flex;align-items:center;gap:10px;margin-top:10px;padding:6px 8px;border:1px solid var(--ui-stroke-tertiary);border-radius:12px;background:var(--ui-bg-secondary);min-width:0}
.wl-ctrl input[type=range]{flex:1;min-width:80px;accent-color:var(--ui-accent)}
.wl-tlab{font-size:11px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-tlab b{color:var(--ui-text-primary);font-weight:600}
.wl-root .wl-play{border:0;width:34px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--ui-text-primary);color:var(--ui-bg-chrome)}
.wl-play .wl-i{fill:currentColor}
.wl-now{border:1px solid var(--ui-stroke-secondary);height:30px;padding:0 12px;border-radius:9px;background:var(--ui-bg-tertiary);font-weight:600}
.wl-now.is-live{background:var(--ui-green);border-color:var(--ui-green);color:var(--ui-bg-chrome)}
.wl-fx-dr{position:absolute;top:12px;right:12px;bottom:12px;width:min(380px,calc(100% - 24px));overflow:auto;z-index:4;padding:18px;border-radius:12px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);overflow-wrap:anywhere}
.wl-fx-dr.wl-dr{position:absolute;max-height:none}
.wl-floor{fill:var(--ui-bg-secondary);stroke:var(--ui-stroke-tertiary)}
.wl-gridline{stroke:var(--ui-stroke-quaternary);stroke-width:1}
.wl-wall{fill:var(--ui-bg-quaternary)}
.wl-sky{fill:color-mix(in srgb,var(--ui-blue) 30%,var(--ui-bg-tertiary))}
.wl-zone{fill:var(--ui-bg-tertiary);stroke:var(--ui-stroke-secondary);stroke-width:2;stroke-dasharray:6 6}
.wl-door{fill:var(--ui-stroke-primary)}
.wl-dock{fill:color-mix(in srgb,var(--ui-orange) 13%,var(--ui-bg-secondary))}
.wl-plank{stroke:color-mix(in srgb,var(--ui-orange) 20%,transparent);stroke-width:1.5}
.wl-bed{fill:none;stroke:color-mix(in srgb,var(--ui-text-primary) 34%,var(--ui-bg-chrome));stroke-width:30;stroke-linejoin:round}
.wl-bed-in{fill:none;stroke:color-mix(in srgb,var(--ui-text-primary) 20%,var(--ui-bg-chrome));stroke-width:22;stroke-linejoin:round}
.wl-slats{fill:none;stroke:color-mix(in srgb,var(--ui-text-primary) 16%,transparent);stroke-width:22;stroke-dasharray:3 8;stroke-linejoin:round;animation:wl-run 1.1s linear infinite;animation-play-state:paused}
.wl-fxsvg[data-moving="1"] .wl-slats{animation-play-state:running}
.wl-redbed{fill:none;stroke:color-mix(in srgb,var(--ui-red) 28%,var(--ui-bg-chrome));stroke-width:30}
.wl-redslats{fill:none;stroke:var(--ui-yellow);stroke-width:22;stroke-dasharray:9 9;opacity:.85;animation:wl-run 1.4s linear infinite;animation-play-state:paused}
.wl-fxsvg[data-jam="1"] .wl-redslats{animation-play-state:running}
.wl-cable{fill:none;stroke:var(--ui-stroke-primary);stroke-width:4;stroke-linecap:round}
.wl-flabel{font-size:12px;font-weight:600;letter-spacing:1.6px;fill:var(--ui-text-tertiary)}
.wl-m{cursor:pointer;outline:none}
.wl-m-focus{fill:none;stroke:transparent;stroke-width:2;stroke-dasharray:5 4}
.wl-m:hover .wl-m-focus,.wl-m:focus-visible .wl-m-focus{stroke:var(--ui-accent)}
.wl-m-body{fill:var(--ui-bg-elevated);stroke:var(--ui-stroke-secondary)}
.wl-m-dark{fill:color-mix(in srgb,var(--ui-text-primary) 70%,var(--ui-bg-chrome))}
.wl-vent{fill:color-mix(in srgb,var(--ui-bg-chrome) 35%,transparent)}
.wl-rod{stroke:var(--ui-text-tertiary);stroke-width:5;stroke-linecap:round}
.wl-head,.wl-stamp{transform-box:view-box}
.wl-head.is-work{animation:wl-press 1.05s ease-in-out infinite}
.wl-stamp.is-work{animation:wl-press 1.4s ease-in-out infinite}
.wl-head.is-jam{transform:translateY(12px)}
.wl-lamp{fill:color-mix(in srgb,var(--ui-green) 40%,var(--ui-bg-elevated))}
.wl-lamp.is-work{fill:var(--ui-green)}
.wl-lamp.is-crash{fill:var(--ui-red);animation:wl-blink .52s steps(1) infinite}
.wl-lamp.is-pause{fill:var(--ui-yellow);animation:wl-blink 1s steps(1) infinite}
.wl-hz-a{fill:var(--ui-yellow)}
.wl-hz-b{fill:color-mix(in srgb,var(--ui-text-primary) 80%,var(--ui-bg-chrome))}
.wl-mname{font-size:10px;font-weight:600;letter-spacing:1.2px;fill:var(--ui-text-tertiary)}
.wl-mnum{font-size:9px;font-weight:600;fill:var(--ui-bg-chrome)}
.wl-glass{fill:color-mix(in srgb,var(--ui-purple) 8%,transparent);stroke:color-mix(in srgb,var(--ui-purple) 55%,transparent);stroke-width:2}
.wl-glass.is-work{fill:color-mix(in srgb,var(--ui-purple) 22%,transparent)}
.wl-beam{fill:var(--ui-purple);transform-box:view-box;animation:wl-beam 1.5s ease-in-out infinite}
.wl-dome{fill:color-mix(in srgb,var(--ui-cyan) 18%,transparent);stroke:color-mix(in srgb,var(--ui-cyan) 70%,transparent);stroke-width:3}
.wl-liquid{fill:color-mix(in srgb,var(--ui-cyan) 45%,transparent)}
.wl-glassline{fill:none;stroke:var(--ui-text-primary);stroke-width:4;stroke-linecap:round}
.wl-ink{fill:var(--ui-text-tertiary)}
.wl-pkg{cursor:pointer;outline:none;transition:transform .7s cubic-bezier(.16,1,.3,1)}
.wl-pkg-sh{fill:color-mix(in srgb,var(--ui-bg-chrome) 50%,transparent)}
.wl-pkg-lid{fill:color-mix(in srgb,var(--ui-orange) 38%,var(--ui-bg-elevated))}
.wl-pkg-body{fill:color-mix(in srgb,var(--ui-orange) 62%,var(--ui-bg-elevated))}
.wl-pkg-tape{fill:color-mix(in srgb,var(--ui-orange) 80%,var(--ui-bg-chrome))}
.wl-pkg.is-scrap{opacity:.8}
.wl-pkg.is-scrap .wl-pkg-lid,.wl-pkg.is-scrap .wl-pkg-body{fill:var(--ui-bg-quaternary)}
.wl-pkg-sel{fill:none;stroke:var(--ui-text-primary);stroke-width:2}
.wl-pkg-focus{fill:none;stroke:transparent;stroke-width:2}
.wl-pkg:focus-visible .wl-pkg-focus,.wl-pkg:hover .wl-pkg-focus{stroke:var(--ui-accent)}
.wl-bang{fill:var(--ui-red)}
.wl-bang.is-pause{fill:var(--ui-yellow)}
.wl-bang-t{font-size:9px;font-weight:700;fill:var(--ui-bg-chrome)}
.wl-lock{fill:var(--ui-text-primary)}
.wl-lock-s{fill:none;stroke:var(--ui-bg-chrome);stroke-width:1.6}
.wl-bay{fill:var(--ui-bg-tertiary)}
.wl-bay.is-on{fill:color-mix(in srgb,var(--ui-red) 12%,var(--ui-bg-secondary))}
.wl-bay-edge{fill:none;stroke:var(--ui-stroke-secondary);stroke-width:10}
.wl-bay-edge.is-on{stroke:var(--ui-red)}
.wl-ants{fill:none;stroke:color-mix(in srgb,var(--ui-text-primary) 75%,var(--ui-bg-chrome));stroke-width:10;stroke-dasharray:10 10;animation:wl-ants 1.2s linear infinite}
.wl-binhead{fill:var(--ui-stroke-secondary)}
.wl-binhead.is-on{fill:var(--ui-red)}
.wl-binhead-t{font-size:13px;font-weight:600;letter-spacing:1px;fill:var(--ui-bg-chrome)}
.wl-clear{font-size:13px;font-weight:500;fill:var(--ui-text-tertiary)}
.wl-ring{fill:none;stroke:var(--ui-red);stroke-width:3;transform-box:fill-box;transform-origin:center;animation:wl-ring 1.4s ease-out infinite}
.wl-halo{fill:color-mix(in srgb,var(--ui-red) 14%,transparent)}
.wl-smoke circle{fill:var(--ui-text-tertiary);opacity:.3;transform-box:fill-box;transform-origin:center;animation:wl-smoke 2.4s ease-out infinite}
.wl-smoke circle:nth-child(2){animation-delay:.8s}
.wl-smoke circle:nth-child(3){animation-delay:1.6s}
.wl-fo{overflow:visible}
.wl-tag{height:100%;display:flex;align-items:center;justify-content:center;pointer-events:none}
.wl-tag span{display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:2px 10px;border-radius:11px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);font-size:11px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-tag i{width:8px;height:8px;border-radius:50%;flex:none}
.wl-tag.is-crash span{background:var(--ui-red);border-color:var(--ui-red);color:var(--ui-bg-chrome)}
.wl-tag.is-pause span{background:var(--ui-yellow);border-color:var(--ui-yellow);color:var(--ui-bg-chrome)}
.wl-callout{height:100%;display:flex;flex-direction:column;justify-content:center;gap:1px;padding:6px 12px 6px 14px;border-radius:14px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);border-left:6px solid var(--ui-red);cursor:pointer;min-width:0;line-height:1.3;color:var(--ui-text-primary)}
.wl-callout.is-pause{border-left-color:var(--ui-yellow)}
.wl-callout small{font-size:10px;font-weight:600;letter-spacing:1.2px;color:var(--ui-text-secondary)}
.wl-callout b{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-callout span{font-size:12px;color:var(--ui-text-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-callout em{font-style:normal;font-size:12px;font-weight:600}
.wl-sign{height:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 14px;border-radius:12px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-tertiary);color:var(--ui-text-primary)}
.wl-sign b{font-size:24px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-sign span{text-align:right;font-size:12px;color:var(--ui-text-tertiary);line-height:1.3}
.wl-gatein{font-size:9px;font-weight:600;fill:var(--ui-text-tertiary)}
.wl-lampin{fill:var(--ui-bg-quaternary)}
.wl-lampin.is-on{fill:var(--ui-green)}
.wl-overflow{font-size:12px;font-weight:600;fill:var(--ui-text-secondary)}
.wl-scrim{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:24px;background:color-mix(in srgb,var(--ui-bg-chrome) 72%,transparent)}
.wl-dlg{width:min(620px,100%);max-height:min(${BOX.dialog}px,100%);overflow:auto;padding:20px 22px;border-radius:14px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);color:var(--ui-text-primary);overflow-wrap:anywhere}
.wl-dlg h2{margin:0 0 6px;font-size:16px;font-weight:600}
.wl-dlg p{margin:6px 0;color:var(--ui-text-secondary)}
.wl-dlg .wl-task{font-weight:600;color:var(--ui-text-primary)}
.wl-steps{margin:10px 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px;counter-reset:wl}
.wl-steps li{display:grid;grid-template-columns:14px minmax(0,1fr) auto;gap:8px;align-items:start;font-size:12.5px}
.wl-steps .wl-st{font-size:11px;color:var(--ui-text-tertiary);white-space:nowrap}
.wl-steps .wl-st.is-failed{color:var(--ui-text-primary);font-weight:600}
.wl-steps .wl-serr{grid-column:2/-1;font-size:12px;color:var(--ui-text-secondary)}
.wl-mark{width:10px;height:10px;border-radius:50%;margin-top:4px;border:2px solid var(--ui-stroke-primary)}
.wl-mark.is-done{background:var(--ui-green);border-color:var(--ui-green)}
.wl-mark.is-failed{background:var(--ui-red);border-color:var(--ui-red)}
.wl-mark.is-running{border-color:var(--ui-accent)}
.wl-field{display:flex;flex-direction:column;gap:4px;margin:12px 0;font-weight:600}
.wl-field small{font-weight:400;color:var(--ui-text-tertiary)}
.wl-field .wl-input{width:140px}
.wl-quote{white-space:pre-wrap;padding:10px 12px;border-radius:10px;background:var(--ui-bg-secondary);max-height:200px;overflow:auto}
.wl-callnote{padding:8px 10px;border-radius:8px;background:var(--ui-bg-secondary);font-size:12.5px}
.wl-result{margin-top:10px;padding:8px 10px;border-radius:8px;border-left:3px solid var(--ui-green);background:var(--ui-bg-secondary)}
.wl-result.is-failed{border-left-color:var(--ui-red)}
.wl-dlg-actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;margin-top:16px}
@keyframes wl-run{to{stroke-dashoffset:-22}}
@keyframes wl-press{0%,62%,100%{transform:translateY(0)}22%,30%{transform:translateY(20px)}}
@keyframes wl-beam{0%,100%{transform:translateX(0)}50%{transform:translateX(40px)}}
@keyframes wl-blink{50%{opacity:.35}}
@keyframes wl-ants{to{stroke-dashoffset:-40}}
@keyframes wl-ring{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.1);opacity:0}}
@keyframes wl-smoke{0%{transform:translate(0,0) scale(.6);opacity:.45}100%{transform:translate(18px,-64px) scale(1.9);opacity:0}}
@media (prefers-reduced-motion:reduce){.wl-root *,.wl-root *::before,.wl-root *::after{animation:none!important;transition:none!important}}
`

function StatusPill({ task, t }) {
  const key = statusKey(task.status)
  return h(
    'span',
    { className: 'wl-status', 'data-status': key },
    h('i', { style: { background: STATUS_TONE[key] || 'var(--ui-text-tertiary)' } }),
    t(`wingline.status.${key}`)
  )
}

function reasonOf(task, t) {
  const r = String(task.block_reason_plain || '').trim()
  if (r) return r
  const e = String(task.error_plain || '').split('\n')[0].trim()
  return e || t('wingline.needs.reasonUnknown')
}

function retriesText(task, t) {
  const used = isNum(task.consecutive_failures) ? task.consecutive_failures : 0
  return isNum(task.max_retries) ? t('wingline.needs.retries', used, task.max_retries) : t('wingline.needs.retriesNoMax', used)
}

function NeedsYou({ list, selId, onSelect, onAction, now, t }) {
  return h(
    'section',
    { 'aria-labelledby': 'wl-needs-h' },
    h('h2', { className: 'wl-h2', id: 'wl-needs-h' }, t('wingline.needs.title'), list.length ? h('small', null, t('wingline.needs.count', list.length)) : null),
    list.length
      ? h(
          'div',
          { className: 'wl-needs' },
          list.map(task => {
            const r = lastRun(task)
            return h(
              'article',
              {
                key: task.id,
                className: `wl-panel wl-attn${task.id === selId ? ' is-sel' : ''}`,
                'data-id': task.id,
                onClick: () => onSelect(task.id)
              },
              h('div', { className: 'wl-badge' }, h(Icon, { name: 'clock', size: 20 })),
              h(
                'div',
                { style: { minWidth: 0 } },
                h('h3', null, task.title),
                h('p', { className: 'wl-reason' }, reasonOf(task, t)),
                h(
                  'div',
                  { className: 'wl-facts' },
                  h('span', null, h(Icon, { name: 'alert', size: 13 }), retriesText(task, t)),
                  h('span', null, h(Icon, { name: 'clock', size: 13 }), t('wingline.needs.worked', fmtDur(t, workSeconds(task, now)))),
                  h('span', null, h(Icon, { name: 'retry', size: 13 }), t('wingline.needs.attempts', runsOf(task).length)),
                  h('span', null, h(Icon, { name: 'coin', size: 13 }), money(task.cost?.usd)),
                  h('span', null, h(Icon, { name: 'user', size: 13 }), task.assignee || '—'),
                  r && isNum(r.ended_at) ? h('span', null, t('wingline.needs.stopped', fmtWhen(r.ended_at))) : null
                ),
                h(
                  'div',
                  { className: 'wl-actions', onClick: e => e.stopPropagation() },
                  h(Btn, { id: 'retry', icon: 'retry', kind: 'primary', label: t('wingline.act.retry'), onClick: () => onAction('retry', task) }),
                  h(Btn, { id: 'log', icon: 'log', label: t('wingline.act.log'), onClick: () => onAction('log', task) }),
                  h(Btn, { id: 'chat', icon: 'chat', label: t('wingline.act.chat'), onClick: () => onAction('chat', task) }),
                  h(Btn, { id: 'archive', icon: 'archive', kind: 'ghost', label: t('wingline.act.archive'), onClick: () => onAction('archive', task) })
                )
              )
            )
          })
        )
      : h('div', { className: 'wl-panel wl-empty' }, h(Icon, { name: 'info' }), t('wingline.needs.none'))
  )
}

function WorkingNow({ list, tasks, selId, onSelect, now, t }) {
  let body
  if (list.length) {
    body = h(
      'div',
      { className: 'wl-work' },
      list.map(task => {
        const runs = runsOf(task)
        const cur = runs.filter(r => !isNum(r.ended_at)).pop() || runs[runs.length - 1]
        const elapsed = cur ? Math.max(0, now - cur.started_at) : 0
        const limit = (cur && isNum(cur.max_runtime_seconds) && cur.max_runtime_seconds) || (isNum(task.max_runtime_seconds) ? task.max_runtime_seconds : null)
        const act = task.activity && task.activity.text ? task.activity : null
        return h(
          'article',
          { key: task.id, className: `wl-panel wl-wrow${task.id === selId ? ' is-sel' : ''}`, 'data-id': task.id, onClick: () => onSelect(task.id) },
          h('div', { className: 'wl-wtitle' }, h('span', { className: 'wl-role', style: { background: ROLE_TONE[roleOf(task)] } }), h('span', null, task.title)),
          h('div', { className: 'wl-wmeta' }, t('wingline.working.elapsed', fmtDur(t, elapsed)), limit ? ` · ${t('wingline.working.limit', fmtDur(t, limit))}` : ''),
          h(
            'div',
            { className: 'wl-wact' },
            act ? `${act.text}${isNum(act.at) ? ` · ${t('wingline.working.ago', fmtDur(t, Math.max(0, now - act.at)))}` : ''}` : t('wingline.working.noActivity')
          ),
          limit ? h('div', { className: 'wl-bar' }, h('i', { style: { width: `${Math.min(100, (elapsed / limit) * 100)}%` } })) : null
        )
      })
    )
  } else {
    const ends = tasks.flatMap(x => runsOf(x).map(r => r.ended_at)).filter(isNum)
    body = h(
      'div',
      { className: 'wl-panel wl-empty' },
      h(Icon, { name: 'moon' }),
      h('div', null, t('wingline.working.none'), ' ', ends.length ? t('wingline.working.lastStop', fmtWhen(Math.max(...ends))) : t('wingline.working.nothingYet'))
    )
  }
  return h('section', { 'aria-labelledby': 'wl-work-h' }, h('h2', { className: 'wl-h2', id: 'wl-work-h' }, t('wingline.working.title')), body)
}

function Pipeline({ tasks, selId, onSelect, now, t }) {
  const lay = useMemo(() => pipelineLayout(tasks), [tasks])
  return h(
    'section',
    { 'aria-labelledby': 'wl-pipe-h' },
    h('h2', { className: 'wl-h2', id: 'wl-pipe-h' }, t('wingline.pipe.title'), h('small', null, t('wingline.pipe.sub'))),
    lay.nodes.length
      ? h(
          'div',
          { className: 'wl-panel wl-pipe' },
          h(
            'svg',
            { width: lay.width, height: lay.height, viewBox: `0 0 ${lay.width} ${lay.height}`, role: 'group', 'aria-label': t('wingline.pipe.title') },
            h(
              'defs',
              null,
              h('marker', { id: 'wl-ar', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, h('path', { d: 'M0,1L9,5L0,9z', className: 'wl-arrow' }))
            ),
            lay.edges.map(e => {
              const x1 = e.from.x + NODE.w
              const y1 = e.from.y + NODE.h / 2
              const x2 = e.to.x - 4
              const y2 = e.to.y + NODE.h / 2
              const mx = (x1 + x2) / 2
              return h('path', { key: e.key, className: 'wl-edge', d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, markerEnd: 'url(#wl-ar)' })
            }),
            lay.nodes.map(n => {
              const task = n.task
              const r = lastRun(task)
              const tone = STATUS_TONE[statusKey(task.status)] || 'var(--ui-text-tertiary)'
              return h(
                'g',
                {
                  key: task.id,
                  className: `wl-node${task.id === selId ? ' is-sel' : ''}`,
                  transform: `translate(${n.x},${n.y})`,
                  tabIndex: 0,
                  role: 'button',
                  'aria-label': task.title,
                  'data-id': task.id,
                  onClick: () => onSelect(task.id),
                  onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect(task.id)
                    }
                  }
                },
                h('rect', { className: 'wl-card', width: NODE.w, height: NODE.h, rx: 10 }),
                h('rect', { x: 12, y: 13, width: 8, height: 8, rx: 2, style: { fill: ROLE_TONE[roleOf(task)] } }),
                h('circle', { cx: NODE.w - 14, cy: 17, r: 4, style: { fill: tone } }),
                h(
                  'foreignObject',
                  { x: 0, y: 0, width: NODE.w - 22, height: NODE.h },
                  h(
                    'div',
                    { className: 'wl-nt' },
                    h('b', null, n.label),
                    h('span', null, `${fmtDur(t, workSeconds(task, now))} · ${money(task.cost?.usd)}${r ? ` · ${t(`wingline.run.${runKind(r)}`)}` : ''}`)
                  )
                )
              )
            })
          )
        )
      : h('div', { className: 'wl-panel wl-empty' }, h(Icon, { name: 'info' }), t('wingline.pipe.none'))
  )
}

function Timeline({ tasks, axis, selId, onSelect, filter, now, t }) {
  const groups = useMemo(() => timelineGroups(tasks, t), [tasks, t])
  const pct = x => (axis.toC(x) / axis.span) * 100
  const allowed = filter ? FILTERS[filter] : null
  return h(
    'section',
    { 'aria-labelledby': 'wl-tl-h' },
    h('h2', { className: 'wl-h2', id: 'wl-tl-h' }, t('wingline.tl.title'), h('small', null, t('wingline.tl.sub'))),
    h(
      'div',
      { className: 'wl-panel wl-tl' },
      h(
        'div',
        { className: 'wl-tl-head' },
        h('span', null, t('wingline.tl.task')),
        h(
          'div',
          { className: 'wl-ticks' },
          [0, 1, 2, 3, 4].map(k => h('span', { key: k, style: { left: `${k * 25}%` } }, fmtWhen(axis.toR((axis.span * k) / 4))))
        ),
        h('span', { style: { textAlign: 'right' } }, t('wingline.tl.spent'))
      ),
      h(
        'div',
        { className: 'wl-tl-body' },
        groups.map(g =>
          h(
            'div',
            { key: `g-${g.name}-${g.tasks[0].id}`, className: 'wl-tl-groupbox' },
            h('div', { className: 'wl-tl-group' }, h('span', null, g.name), h('em', null, t('wingline.tl.group', g.tasks.length, money(g.tasks.reduce((s, x) => s + (x.cost?.usd || 0), 0))))),
            g.tasks.map(task =>
              h(
                'div',
                {
                  key: task.id,
                  className: `wl-tl-row${task.id === selId ? ' is-sel' : ''}${allowed && !allowed.includes(task.status) ? ' is-dim' : ''}`,
                  'data-id': task.id,
                  tabIndex: 0,
                  role: 'button',
                  'aria-label': task.title,
                  onClick: () => onSelect(task.id),
                  onKeyDown: e => {
                    if (e.key === 'Enter') onSelect(task.id)
                  }
                },
                h('div', { className: 'wl-tl-name' }, h('span', { className: 'wl-role', style: { background: ROLE_TONE[roleOf(task)] } }), h('span', null, task.title)),
                h(
                  'div',
                  { className: 'wl-track' },
                  h('div', { className: 'wl-grid' }),
                  runsOf(task).map((r, i) => {
                    const a = pct(r.started_at)
                    const b = pct(runEnd(r, now))
                    return h('div', {
                      key: `${task.id}-${r.id ?? i}`,
                      className: `wl-run wl-k-${runKind(r)}`,
                      'data-kind': runKind(r),
                      style: { left: `${a}%`, width: `${Math.max(0.5, b - a)}%` }
                    })
                  })
                ),
                h('div', { className: 'wl-cost' }, money(task.cost?.usd))
              )
            )
          )
        )
      ),
      h(
        'div',
        { className: 'wl-legend' },
        ['ok', 'stopped', 'paused', 'running'].map(k => h('span', { key: k }, h('i', { className: `wl-k-${k}` }), t(`wingline.run.${k}`))),
        h(
          'span',
          null,
          t('wingline.tl.roles'),
          ROLES.map(r => h('span', { key: r }, h('span', { className: 'wl-role', style: { background: ROLE_TONE[r] } }), t(`wingline.role.${r}`)))
        )
      )
    )
  )
}

function Drawer({ task, byId, now, t, onAction, log, note, setNote, onClose, className }) {
  if (!task) return h('aside', { className: `wl-panel wl-dr ${className || ''}` }, h('div', { className: 'wl-empty' }, h(Icon, { name: 'info' }), t('wingline.dr.pick')))
  const role = roleOf(task)
  const runs = runsOf(task)
  const titleOf = id => byId.get(id)?.title || id
  const waits = (task.parents || []).map(titleOf).join(', ') || t('wingline.dr.nothing')
  const unlocks = (task.children || []).map(titleOf).join(', ') || t('wingline.dr.nothing')
  const blocked = task.status === 'blocked'
  const costStatus = ['estimated', 'actual', 'mixed', 'none'].includes(task.cost?.status) ? task.cost.status : 'none'
  const limit = isNum(task.max_runtime_seconds) && task.max_runtime_seconds > 0 ? fmtDur(t, task.max_runtime_seconds) : t('wingline.dr.noLimit')
  const logHere = log && log.id === task.id ? log : null
  return h(
    'aside',
    { className: `wl-panel wl-dr ${className || ''}`, 'aria-live': 'polite', 'data-id': task.id },
    h(
      'div',
      { className: 'wl-dr-top' },
      h('span', { className: 'wl-role', style: { background: ROLE_TONE[role] } }),
      h('span', null, t(`wingline.role.${role}`), ' · '),
      h('span', { className: 'wl-mono' }, task.id),
      onClose ? h('button', { type: 'button', className: 'wl-x', 'aria-label': t('wingline.dr.close'), onClick: onClose }, h(Icon, { name: 'close', size: 14 })) : null
    ),
    h('h3', null, task.title),
    h(StatusPill, { task, t }),
    blocked
      ? h(
          'div',
          { className: 'wl-why' },
          h('small', null, t('wingline.dr.why')),
          reasonOf(task, t),
          task.error_plain ? h('div', { className: 'wl-err wl-mono' }, task.error_plain) : null,
          task.error_raw && task.error_raw !== task.error_plain
            ? h('details', { className: 'wl-raw' }, h('summary', null, t('wingline.dr.raw')), h('div', { className: 'wl-err wl-mono' }, task.error_raw))
            : null
        )
      : task.error_plain && task.status !== 'done'
        ? h('div', { className: 'wl-why' }, h('small', null, t('wingline.dr.error')), h('div', { className: 'wl-err wl-mono' }, task.error_plain))
        : null,
    h(
      'dl',
      { className: 'wl-dl' },
      h('div', null, h('dt', null, t('wingline.dr.spent')), h('dd', null, money(task.cost?.usd), h('small', { 'data-cost': costStatus }, t(`wingline.cost.${costStatus}`)))),
      h('div', null, h('dt', null, t('wingline.dr.work')), h('dd', null, fmtDur(t, workSeconds(task, now)))),
      h('div', null, h('dt', null, t('wingline.dr.attempts')), h('dd', null, String(runs.length))),
      h('div', null, h('dt', null, t('wingline.dr.comments')), h('dd', null, String(isNum(task.comments) ? task.comments : 0)))
    ),
    h(
      'div',
      { className: 'wl-kv' },
      h('span', null, t('wingline.dr.assignee')),
      h('span', null, task.assignee || '—'),
      h('span', null, t('wingline.dr.limit')),
      h('span', null, limit),
      h('span', null, t('wingline.dr.retries')),
      h('span', null, isNum(task.max_retries) ? `${task.consecutive_failures || 0}/${task.max_retries}` : String(task.consecutive_failures || 0)),
      h('span', null, t('wingline.dr.created')),
      h('span', null, fmtWhen(task.created_at)),
      h('span', null, t('wingline.dr.waits')),
      h('span', null, waits),
      h('span', null, t('wingline.dr.unlocks')),
      h('span', null, unlocks),
      task.activity && task.activity.text ? h('span', null, t('wingline.dr.activity')) : null,
      task.activity && task.activity.text ? h('span', null, task.activity.text) : null
    ),
    runs.length
      ? h(
          'ol',
          { className: 'wl-attempts' },
          runs.map((r, i) => {
            const kind = runKind(r)
            const took = runEnd(r, now) - r.started_at
            const lim = isNum(r.max_runtime_seconds) && r.max_runtime_seconds > 0 ? r.max_runtime_seconds : null
            const detail = r.error_plain || r.summary || ''
            return h(
              'li',
              { key: r.id ?? i, className: `is-${kind}` },
              h('i', null),
              h('b', null, t('wingline.run.attempt', i + 1)),
              ` · ${fmtWhen(r.started_at)} · ${t(`wingline.run.${kind}`)} · ${t('wingline.run.took', fmtDur(t, took))}`,
              kind === 'stopped' ? h('small', null, r.outcome === 'timed_out' ? t('wingline.run.limitHit', fmtDur(t, lim || took)) : lim && took > lim ? t('wingline.run.pastLimit', fmtDur(t, lim), r.outcome || r.status || '?') : t('wingline.run.outcome', r.outcome || r.status || '?')) : null,
              detail ? h('small', null, detail) : null
            )
          })
        )
      : h('p', { className: 'wl-raw' }, t('wingline.dr.noRuns')),
    h(
      'div',
      { className: 'wl-actions' },
      blocked ? h(Btn, { id: 'retry', icon: 'retry', kind: 'primary', label: t('wingline.act.retry'), onClick: () => onAction('retry', task) }) : null,
      h(Btn, { id: 'log', icon: 'log', label: t('wingline.act.log'), onClick: () => onAction('log', task) }),
      h(Btn, { id: 'kanban', icon: 'board', label: t('wingline.act.kanban'), onClick: () => onAction('kanban', task) }),
      h(Btn, { id: 'chat', icon: 'chat', label: t('wingline.act.chat'), onClick: () => onAction('chat', task) }),
      task.status !== 'archived' ? h(Btn, { id: 'archive', icon: 'archive', kind: 'ghost', label: t('wingline.act.archive'), onClick: () => onAction('archive', task) }) : null
    ),
    logHere
      ? h(
          'div',
          { className: 'wl-log' },
          h('div', { className: 'wl-log-head' }, h(Icon, { name: 'log' }), t('wingline.dr.log'), h(Btn, { id: 'log-close', kind: 'ghost', label: t('wingline.dr.logClose'), onClick: () => onAction('log-close', task) })),
          logHere.loading
            ? h('p', { className: 'wl-raw' }, t('wingline.dr.logLoading'))
            : logHere.error
              ? h('p', { className: 'wl-raw', role: 'alert' }, t('wingline.dr.logFailed', logHere.error))
              : !logHere.exists
                ? h('p', { className: 'wl-raw' }, t('wingline.dr.logNone'))
                : h(
                    'div',
                    null,
                    logHere.truncated ? h('p', { className: 'wl-raw' }, t('wingline.dr.logTrunc')) : null,
                    h('pre', { className: 'wl-logpre wl-mono' }, logHere.content || t('wingline.dr.logEmpty'))
                  )
        )
      : null,
    h(
      'div',
      { className: 'wl-note' },
      h('h4', null, t('wingline.dr.note')),
      h('textarea', {
        className: 'wl-input',
        placeholder: t('wingline.dr.notePh'),
        'aria-label': t('wingline.dr.note'),
        value: note,
        onChange: e => setNote(e.target.value)
      }),
      h(Btn, { id: 'note', icon: 'note', label: t('wingline.act.note'), disabled: !note.trim(), onClick: () => onAction('note', task) })
    )
  )
}

function Tag({ x, y, w = 220, text, tone, kind }) {
  return h(
    'foreignObject',
    { className: 'wl-fo', x: x - w / 2, y: y - 12, width: w, height: 24 },
    h('div', { className: `wl-tag${kind ? ` is-${kind}` : ''}` }, h('span', null, tone ? h('i', { style: { background: tone } }) : null, text))
  )
}

function Hazard({ x, y, w, h: hh, r }) {
  return h('rect', { x, y, width: w, height: hh, rx: r, style: { fill: 'url(#wl-hz)' } })
}

function Lamp({ x, y, st }) {
  return h('circle', { cx: x, cy: y, r: st === 'crash' ? 6.5 : st === 'pause' ? 6 : 5, className: `wl-lamp${st === 'idle' ? '' : ` is-${st}`}` })
}

function Block({ x, y, w, h: hh, r = 10, role }) {
  return h(
    'g',
    null,
    h('rect', { className: 'wl-m-body', x, y, width: w, height: hh, rx: r }),
    h('rect', { x: x + 2, y: y + hh - 4, width: w - 4, height: 3, rx: 1.5, style: { fill: ROLE_TONE[role] } })
  )
}

function MachineArt({ m, st, gateIn }) {
  const { x, y } = m
  const jam = st === 'crash' || st === 'pause'
  const work = st === 'work'
  if (m.kind === 'press') {
    return h(
      'g',
      null,
      h(Block, { x: x - 50, y: y - 62, w: 100, h: 34, role: m.role }),
      h(Block, { x: x - 50, y: y + 28, w: 100, h: 34, role: m.role }),
      jam ? h(Hazard, { x: x - 46, y: y + 48, w: 92, h: 10, r: 4 }) : null,
      h(
        'g',
        { className: `wl-head${work ? ' is-work' : jam ? ' is-jam' : ''}` },
        h('line', { className: 'wl-rod', x1: x - 18, y1: y - 40, x2: x - 18, y2: y - 50 }),
        h('line', { className: 'wl-rod', x1: x + 18, y1: y - 40, x2: x + 18, y2: y - 50 }),
        h('rect', { x: x - 30, y: y - 50, width: 60, height: 46, rx: 9, style: { fill: ROLE_TONE[m.role] } }),
        h('rect', { x: x - 14, y: y - 34, width: 28, height: 14, rx: 4, className: 'wl-vent' })
      ),
      h('rect', { className: 'wl-m-dark', x: x - 40, y: y - 66, width: 80, height: 26, rx: 8 }),
      [0, 1, 2, 3, 4].map(k => h('rect', { key: k, className: 'wl-vent', x: x - 30 + k * 10, y: y - 60, width: 5, height: 14 })),
      h(Lamp, { x: x + 30, y: y - 53, st })
    )
  }
  if (m.kind === 'scan') {
    return h(
      'g',
      null,
      h(Block, { x: x - 30, y: y - 42, w: 60, h: 20, r: 8, role: m.role }),
      h(Block, { x: x - 30, y: y + 22, w: 60, h: 20, r: 8, role: m.role }),
      h('rect', { className: `wl-glass${work ? ' is-work' : ''}`, x: x - 26, y: y - 30, width: 52, height: 60, rx: 10 }),
      work ? h('rect', { className: 'wl-beam', x: x - 21.5, y: y - 28, width: 3, height: 56 }) : null,
      jam ? h(Hazard, { x: x - 28, y: y + 34, w: 56, h: 7, r: 3 }) : null,
      h('rect', { className: 'wl-m-dark', x: x - 34, y: y - 46, width: 68, height: 14, rx: 6 }),
      h('text', { className: 'wl-mnum', x: x - 22, y: y - 36, textAnchor: 'middle' }, String(m.n)),
      h(Lamp, { x: x + 24, y: y - 39, st })
    )
  }
  if (m.kind === 'gate') {
    const ins = gateIn || { done: [], total: 0 }
    const n = Math.min(ins.total, 6)
    const step = n > 4 ? 16 : 24
    return h(
      'g',
      null,
      h(Block, { x: x - 60, y: y - 66, w: 120, h: 40, r: 12, role: m.role }),
      h(Block, { x: x - 60, y: y + 26, w: 120, h: 40, r: 12, role: m.role }),
      h(
        'g',
        { className: `wl-stamp${work ? ' is-work' : ''}` },
        h('line', { className: 'wl-rod', x1: x, y1: y - 50, x2: x, y2: y - 46, style: { strokeWidth: 7 } }),
        h('circle', { cx: x, cy: y - 36, r: 26, style: { fill: ROLE_TONE[m.role] } }),
        h('circle', { cx: x, cy: y - 36, r: 15, className: 'wl-glassline', style: { strokeWidth: 3, opacity: 0.5 } })
      ),
      jam ? h(Hazard, { x: x - 56, y: y - 40, w: 112, h: 8, r: 4 }) : null,
      Array.from({ length: n }, (_, i) => h('circle', { key: i, className: `wl-lampin${ins.done[i] ? ' is-on' : ''}`, cx: x - ((n - 1) * step) / 2 + i * step, cy: y + 40, r: 6 })),
      ins.total ? h('text', { className: 'wl-gatein', x, y: y + 58, textAnchor: 'middle' }, ins.label) : null,
      h(Lamp, { x: x + 46, y: y - 56, st })
    )
  }
  return h(
    'g',
    null,
    h('rect', { className: 'wl-m-body', x: x - 66, y: y - 48, width: 132, height: 96, rx: 22 }),
    h('rect', { x: x - 64, y: y + 40, width: 128, height: 6, rx: 3, style: { fill: ROLE_TONE[m.role] } }),
    h('circle', { className: 'wl-dome', cx: x + 18, cy: y - 6, r: 30 }),
    h('path', { className: 'wl-liquid', d: `M${x - 10},${y + 6} Q${x + 18},${y - 2} ${x + 46},${y + 6} A30,30 0 0 1 ${x - 10},${y + 6}z` }),
    h('circle', { className: 'wl-glassline', cx: x - 34, cy: y - 18, r: 9 }),
    h('line', { className: 'wl-glassline', x1: x - 28, y1: y - 12, x2: x - 20, y2: y - 4 }),
    jam ? h(Hazard, { x: x - 60, y: y + 28, w: 120, h: 10, r: 4 }) : null,
    h(Lamp, { x: x + 52, y: y - 34, st })
  )
}

function Crate({ task, x, y, sel, alert, scrap, onSelect, label }) {
  return h(
    'g',
    {
      className: `wl-pkg${scrap ? ' is-scrap' : ''}`,
      style: { transform: `translate(${x}px, ${y}px)` },
      role: 'button',
      tabIndex: 0,
      'aria-label': label,
      'data-id': task.id,
      'data-pkg': '1',
      onClick: e => {
        e.stopPropagation()
        onSelect(task.id)
      },
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(task.id)
        }
      }
    },
    h('ellipse', { className: 'wl-pkg-sh', cx: 2, cy: 12, rx: 16, ry: 5.5 }),
    h('rect', { className: 'wl-pkg-lid', x: -15, y: -13.5, width: 30, height: 14, rx: 4 }),
    h('rect', { className: 'wl-pkg-body', x: -15, y: -4.5, width: 30, height: 18, rx: 4 }),
    h('rect', { className: 'wl-pkg-tape', x: -3, y: -13.5, width: 6, height: 9 }),
    h('rect', { x: -11, y: 0.5, width: 9, height: 8, rx: 2, style: { fill: scrap ? 'var(--ui-text-quaternary)' : ROLE_TONE[roleOf(task)] } }),
    alert
      ? h(
          'g',
          null,
          h('rect', { className: `wl-bang${alert === 'pause' ? ' is-pause' : ''}`, x: 1, y: -0.5, width: 11, height: 10, rx: 2 }),
          h('text', { className: 'wl-bang-t', x: 6.5, y: 7.5, textAnchor: 'middle' }, '!')
        )
      : null,
    h('rect', { className: sel ? 'wl-pkg-sel' : 'wl-pkg-focus', x: -21, y: -20, width: 42, height: 40, rx: 8 })
  )
}

function Factory({ tasks, now, axis, selId, onSelect, onNotice, t, drawer }) {
  const [live, setLive] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(4)
  const [c, setC] = useState(axis.span)
  const cRef = useRef(c)
  cRef.current = c
  const spanRef = useRef(axis.span)
  spanRef.current = axis.span
  useEffect(() => {
    if (!playing) return undefined
    const id = window.setInterval(() => {
      const next = cRef.current + 0.1 * speed * 60
      if (next >= spanRef.current) {
        setPlaying(false)
        setLive(true)
        setC(spanRef.current)
      } else setC(next)
    }, 100)
    return () => window.clearInterval(id)
  }, [playing, speed])
  useEffect(() => {
    if (live) setC(axis.span)
  }, [live, axis.span])
  const T = live ? null : axis.toR(Math.min(c, axis.span))
  const lay = useMemo(() => layoutFactory(tasks, T), [tasks, T])
  const byId = useMemo(() => new Map(tasks.map(x => [x.id, x])), [tasks])
  const names = {
    pressA: t('wingline.fx.machine.pressA'),
    pressB: t('wingline.fx.machine.pressB'),
    gate: t('wingline.fx.machine.gate'),
    lab: t('wingline.fx.machine.lab')
  }
  const nameOf = m => (m.kind === 'scan' ? t('wingline.fx.machine.scan', m.n) : names[m.key])
  const working = Object.values(lay.occ).filter(o => o.state === 'work').length
  const nBay = lay.zones.bay.length
  const shipped = lay.zones.dock.reduce((s, x) => s + (x.cost?.usd || 0), 0)
  const [day, time] = fmtClock(live ? now : T)
  const machineOfTask = {}
  for (const [k, o] of Object.entries(lay.occ)) machineOfTask[o.task.id] = k
  const whereOf = task => {
    const z = lay.zoneOf[task.id]
    if (z === 'machine') {
      const key = Object.keys(lay.occ).find(k => lay.occ[k].task.id === task.id || lay.occ[k].extra.some(e => e.id === task.id))
      const m = MACHINES.find(x => x.key === key)
      return t('wingline.fx.where.machine', m ? nameOf(m) : '')
    }
    if (z === 'bay') return lay.kinds[task.id] === 'crash' ? t('wingline.fx.where.crash') : t('wingline.fx.where.pause')
    if (z === 'intake') return (task.parents || []).some(p => lay.zoneOf[p] && lay.zoneOf[p] !== 'dock') ? t('wingline.fx.where.wait') : t('wingline.fx.where.intake')
    if (z === 'dock') return t('wingline.fx.where.dock')
    return t('wingline.fx.where.scrap')
  }
  const gateTask = (lay.occ.gate && lay.occ.gate.task) || [...tasks].filter(x => roleOf(x) === 'gate' && lay.zoneOf[x.id] !== 'hidden').sort((a, b) => firstStart(b) - firstStart(a))[0]
  const gateIn = gateTask
    ? (() => {
        const ps = (gateTask.parents || []).filter(p => byId.has(p))
        const done = ps.map(p => lay.zoneOf[p] === 'dock')
        return { done, total: ps.length, label: t('wingline.fx.inputs', done.filter(Boolean).length, ps.length) }
      })()
    : null
  const machineTask = m => {
    const o = lay.occ[m.key]
    if (o) return o.task
    const done = tasks
      .filter(x => roleOf(x) === m.role)
      .map(x => ({ x, r: runsOf(x).filter(r => T == null || r.started_at <= T).pop() }))
      .filter(v => v.r)
      .sort((a, b) => b.r.started_at - a.r.started_at)
    return done.length ? done[0].x : null
  }
  const clickMachine = m => {
    const task = machineTask(m)
    if (task) onSelect(task.id)
    else onNotice(t('wingline.fx.noTask', nameOf(m)))
  }
  const crate = (task, zone) => {
    const p = lay.pos[task.id]
    if (!p) return null
    return h(Crate, {
      key: task.id,
      task,
      x: p[0],
      y: p[1],
      sel: task.id === selId,
      alert: zone === 'bay' ? lay.kinds[task.id] : null,
      scrap: zone === 'scrap',
      onSelect,
      label: t('wingline.fx.pkg', task.title, whereOf(task))
    })
  }
  const visible = ['intake', 'machine', 'bay', 'dock', 'scrap'].flatMap(z => lay.zones[z].map(task => ({ task, z })))
  const first = lay.zones.bay[0]
  const firstPos = first ? lay.pos[first.id] : null
  const callout = first && firstPos
    ? (() => {
        const kind = lay.kinds[first.id]
        const r = runsOf(first).filter(x => isNum(x.ended_at) && (T == null || x.ended_at <= T)).pop()
        const kick = kind === 'pause' ? t('wingline.fx.callPause') : r && r.outcome === 'timed_out' ? t('wingline.fx.callLimit') : r && r.outcome === 'crashed' ? t('wingline.fx.callCrash') : t('wingline.fx.callStop')
        const cx = firstPos[0] + 40 + (Math.min(nBay, CAP.bay) - 1) * 76
        const w = Math.max(160, Math.min(1548 - cx, 330))
        return h(
          'foreignObject',
          { className: 'wl-fo', x: cx, y: firstPos[1] - 50, width: w, height: 86 },
          h(
            'div',
            {
              className: `wl-callout${kind === 'pause' ? ' is-pause' : ''}`,
              role: 'button',
              tabIndex: 0,
              'data-callout': first.id,
              onClick: () => onSelect(first.id),
              onKeyDown: e => {
                if (e.key === 'Enter') onSelect(first.id)
              }
            },
            h('small', null, kick),
            h('b', null, first.title),
            h('span', null, t('wingline.fx.callMeta', fmtDur(t, workSeconds(first, T ?? now)), runsOf(first).length, money(first.cost?.usd))),
            h('em', null, t('wingline.fx.decide'))
          )
        )
      })()
    : null
  const toggle = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (live || c >= axis.span) setC(0)
    setLive(false)
    setPlaying(true)
  }
  const goLive = () => {
    setPlaying(false)
    setLive(true)
    setC(axis.span)
  }
  const B = ZONE.bay
  const D = ZONE.dock
  const I = ZONE.intake
  const S = ZONE.scrap
  return h(
    'div',
    { className: 'wl-fx' },
    h(
      'div',
      { className: 'wl-fx-bar' },
      h(
        'div',
        { className: `wl-pill${live ? '' : ' is-replay'}`, 'data-mode': live ? 'live' : 'replay', role: 'status' },
        h('i', null),
        live ? t('wingline.fx.live') : playing ? t('wingline.fx.replay', speed) : t('wingline.fx.paused'),
        h('span', null, live ? (working ? t('wingline.fx.running', working) : t('wingline.fx.idle')) : working ? t('wingline.fx.working', working) : t('wingline.fx.idle'))
      ),
      h('div', { className: 'wl-clock' }, h('small', null, day), h('b', null, time))
    ),
    h(
      'div',
      { className: 'wl-stagewrap' },
      h(
        'div',
        { className: 'wl-stage' },
        h(
          'svg',
          {
            className: 'wl-fxsvg',
            viewBox: '0 0 1600 900',
            preserveAspectRatio: 'xMidYMid meet',
            role: 'group',
            'aria-label': t('wingline.fx.aria'),
            'data-moving': (live ? working > 0 : playing) ? '1' : '0',
            'data-jam': nBay ? '1' : '0'
          },
          h(
            'defs',
            null,
            h(
              'pattern',
              { id: 'wl-hz', width: 14, height: 14, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' },
              h('rect', { className: 'wl-hz-a', width: 7, height: 14 }),
              h('rect', { className: 'wl-hz-b', x: 7, width: 7, height: 14 })
            )
          ),
          h('rect', { className: 'wl-floor', x: 26, y: 84, width: 1548, height: 786, rx: 28 }),
          Array.from({ length: 38 }, (_, i) => h('line', { key: `gx${i}`, className: 'wl-gridline', x1: 66 + i * 40, y1: 114, x2: 66 + i * 40, y2: 866 })),
          Array.from({ length: 19 }, (_, i) => h('line', { key: `gy${i}`, className: 'wl-gridline', x1: 30, y1: 152 + i * 40, x2: 1570, y2: 152 + i * 40 })),
          h('path', { className: 'wl-wall', d: 'M26,112 L26,112 Q26,84 54,84 L1546,84 Q1574,84 1574,112 Z' }),
          Array.from({ length: 8 }, (_, i) => h('rect', { key: `sk${i}`, className: 'wl-sky', x: 120 + i * 170, y: 90, width: 110, height: 16, rx: 5 })),
          h('rect', { className: 'wl-zone', x: I.x, y: I.y, width: I.w, height: I.h, rx: 18 }),
          h('rect', { className: 'wl-door', x: 26, y: 380, width: 18, height: 140, rx: 6 }),
          h('rect', { className: 'wl-dock', x: D.x, y: D.y, width: D.w, height: D.h, rx: 18 }),
          Array.from({ length: 13 }, (_, i) => h('line', { key: `pl${i}`, className: 'wl-plank', x1: D.x + 4, y1: D.y + 108 + i * 20, x2: D.x + D.w - 4, y2: D.y + 108 + i * 20 })),
          h('rect', { className: 'wl-zone', x: S.x, y: S.y, width: S.w, height: S.h, rx: 16 }),
          BELTS.map((b, i) => h('polyline', { key: `bd${i}`, className: 'wl-bed', points: ptsAttr(b) })),
          BELTS.map((b, i) => h('polyline', { key: `bi${i}`, className: 'wl-bed-in', points: ptsAttr(b) })),
          BELTS.map((b, i) => h('polyline', { key: `bs${i}`, className: 'wl-slats', points: ptsAttr(b) })),
          h('polyline', { className: 'wl-redbed', points: ptsAttr(RED_BELT) }),
          h('polyline', { className: 'wl-redslats', points: ptsAttr(RED_BELT) }),
          CABLES.map((d, i) => h('path', { key: `cb${i}`, className: 'wl-cable', d })),
          h('text', { className: 'wl-flabel', x: I.x + 14, y: I.y + 24 }, t('wingline.fx.zone.intake')),
          h('text', { className: 'wl-flabel', x: 360, y: 156 }, t('wingline.fx.zone.build')),
          h('text', { className: 'wl-flabel', x: 690, y: 252 }, t('wingline.fx.zone.review')),
          h('text', { className: 'wl-flabel', x: 1010, y: 266 }, t('wingline.fx.zone.merge')),
          h('text', { className: 'wl-flabel', x: D.x + 16, y: D.y + 26 }, t('wingline.fx.zone.shipped')),
          h('text', { className: 'wl-flabel', x: S.x + 14, y: S.y + 22 }, t('wingline.fx.zone.archived')),
          h('text', { className: 'wl-flabel', x: 410, y: 704 }, t('wingline.fx.zone.investigate')),
          h(
            'g',
            { 'data-bay': nBay },
            h('rect', { className: `wl-bay${nBay ? ' is-on' : ''}`, x: B.x, y: B.y, width: B.w, height: B.h, rx: 20 }),
            h('rect', { className: `wl-bay-edge${nBay ? ' is-on' : ''}`, x: B.x + 5, y: B.y + 5, width: B.w - 10, height: B.h - 10, rx: 16 }),
            nBay ? h('rect', { className: 'wl-ants', x: B.x + 5, y: B.y + 5, width: B.w - 10, height: B.h - 10, rx: 16 }) : null,
            h('rect', { className: `wl-binhead${nBay ? ' is-on' : ''}`, x: B.x + 20, y: B.y + 18, width: 160, height: 30, rx: 15 }),
            h('text', { className: 'wl-binhead-t', x: B.x + 34, y: B.y + 38 }, t('wingline.fx.bin', nBay)),
            nBay ? null : h('text', { className: 'wl-clear', x: B.x + 196, y: B.y + 38 }, t('wingline.fx.clear')),
            lay.zones.bay.slice(0, CAP.bay).map(task => {
              const p = lay.pos[task.id]
              return h('g', { key: `ring-${task.id}` }, h('circle', { className: 'wl-halo', cx: p[0], cy: p[1] + 2, r: 24 }), h('circle', { className: 'wl-ring', cx: p[0], cy: p[1] + 2, r: 22 }))
            })
          ),
          lay.zones.intake.length ? null : h('text', { className: 'wl-clear', x: I.x + I.w / 2, y: I.y + I.h / 2, textAnchor: 'middle' }, t('wingline.fx.queueEmpty')),
          lay.zones.scrap.length ? null : h('text', { className: 'wl-clear', x: S.x + S.w / 2, y: S.y + 82, textAnchor: 'middle' }, t('wingline.fx.none')),
          h(
            'foreignObject',
            { className: 'wl-fo', x: D.x + 12, y: D.y + 40, width: D.w - 24, height: 58 },
            h('div', { className: 'wl-sign', 'data-shipped': lay.zones.dock.length }, h('b', null, money(shipped)), h('span', null, t('wingline.fx.crates', lay.zones.dock.length), h('br', null), t('wingline.fx.shipped')))
          ),
          MACHINES.map(m => {
            const o = lay.occ[m.key]
            const st = o ? o.state : 'idle'
            const label = o ? (o.state === 'work' ? t('wingline.fx.mWork', nameOf(m), o.task.title) : t('wingline.fx.mJam', nameOf(m), o.task.title)) : t('wingline.fx.mIdle', nameOf(m))
            return h(
              'g',
              {
                key: m.key,
                className: 'wl-m',
                role: 'button',
                tabIndex: 0,
                'aria-label': label,
                'data-machine': m.key,
                'data-state': st,
                onClick: () => clickMachine(m),
                onKeyDown: e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    clickMachine(m)
                  }
                }
              },
              h('rect', { className: 'wl-m-focus', x: m.x - m.w / 2 - 8, y: m.y - m.h / 2 - 8, width: m.w + 16, height: m.h + 16, rx: 14 }),
              h(MachineArt, { m, st, gateIn: m.key === 'gate' ? gateIn : null }),
              m.kind === 'scan' ? null : h('text', { className: 'wl-mname', x: m.x, y: m.y + m.h / 2 + (m.kind === 'gate' ? 24 : 16), textAnchor: 'middle' }, nameOf(m).toUpperCase())
            )
          }),
          visible.filter(v => v.z !== 'machine').map(v => crate(v.task, v.z)),
          lay.zones.machine.map(task => crate(task, 'machine')),
          lay.zones.intake
            .filter(task => lay.pos[task.id] && (task.parents || []).some(p => lay.zoneOf[p] && lay.zoneOf[p] !== 'dock'))
            .map(task => {
              const [x, y] = lay.pos[task.id]
              return h(
                'g',
                { key: `lk-${task.id}`, 'aria-hidden': 'true', style: { pointerEvents: 'none' } },
                h('circle', { className: 'wl-lock', cx: x + 14, cy: y - 16, r: 8 }),
                h('path', { className: 'wl-lock-s', d: `M${x + 11.4},${y - 17.5} A2.6,2.6 0 0 1 ${x + 16.6},${y - 17.5}` }),
                h('rect', { className: 'wl-lock-s', x: x + 10.5, y: y - 17, width: 7, height: 5, style: { fill: 'var(--ui-bg-chrome)', stroke: 'none' } })
              )
            }),
          MACHINES.map(m => {
            const o = lay.occ[m.key]
            if (!o) return null
            const tx = m.kind === 'scan' ? m.x + 96 : m.x
            const ty = m.kind === 'scan' ? m.y - 24 : m.y - m.h / 2 - 20
            if (o.state === 'work') {
              const r = runsOf(o.task).filter(x => x.started_at <= (T ?? now)).pop()
              const label = o.task.title + (r ? ` · ${fmtDur(t, Math.max(0, (T ?? now) - r.started_at))}` : '') + (o.extra.length ? ` · ${t('wingline.fx.more', o.extra.length)}` : '')
              return h(Tag, { key: `tag-${m.key}`, x: tx, y: ty, w: m.kind === 'scan' ? 150 : 220, text: label, tone: ROLE_TONE[m.role] })
            }
            return h(Tag, { key: `tag-${m.key}`, x: tx, y: ty, w: 190, text: o.state === 'crash' ? t('wingline.fx.jam') : t('wingline.fx.pause'), kind: o.state })
          }),
          MACHINES.filter(m => lay.occ[m.key] && lay.occ[m.key].state === 'crash').map(m =>
            h(
              'g',
              { key: `sm-${m.key}`, className: 'wl-smoke', 'data-smoke': m.key, 'aria-hidden': 'true', style: { pointerEvents: 'none' } },
              h('circle', { cx: m.x - 8, cy: m.y - m.h / 2 - 4, r: 7 }),
              h('circle', { cx: m.x + 4, cy: m.y - m.h / 2 - 10, r: 6 }),
              h('circle', { cx: m.x + 14, cy: m.y - m.h / 2 - 2, r: 5 })
            )
          ),
          ['intake', 'dock', 'scrap', 'bay'].map(z =>
            lay.overflow[z]
              ? h(
                  'text',
                  {
                    key: `of-${z}`,
                    className: 'wl-overflow',
                    x: z === 'dock' ? D.x + D.w - 20 : z === 'bay' ? B.x + B.w - 24 : z === 'intake' ? I.x + I.w - 14 : S.x + S.w - 14,
                    y: z === 'dock' ? D.y + D.h - 16 : z === 'bay' ? B.y + 38 : z === 'intake' ? I.y + I.h - 14 : S.y + 22,
                    textAnchor: 'end'
                  },
                  t('wingline.fx.more', lay.overflow[z])
                )
              : null
          ),
          callout
        )
      ),
      drawer
    ),
    h(
      'div',
      { className: 'wl-ctrl' },
      h('button', { type: 'button', className: 'wl-play', 'aria-label': playing ? t('wingline.fx.pause') : t('wingline.fx.play'), 'data-ctl': 'play', onClick: toggle }, h(Icon, { name: playing ? 'pause' : 'play', size: 14 })),
      h(
        'div',
        { className: 'wl-seg', role: 'group', 'aria-label': t('wingline.fx.speed') },
        [1, 4, 16].map(s => h('button', { key: s, type: 'button', 'aria-pressed': speed === s ? 'true' : 'false', 'data-speed': s, onClick: () => setSpeed(s) }, `${s}×`))
      ),
      h('span', { className: 'wl-tlab' }, fmtWhen(axis.toR(0))),
      h('input', {
        type: 'range',
        min: 0,
        max: 1000,
        step: 1,
        value: Math.round((Math.min(c, axis.span) / axis.span) * 1000),
        'aria-label': t('wingline.fx.scrub'),
        onChange: e => {
          setPlaying(false)
          setLive(false)
          setC((Number(e.target.value) / 1000) * axis.span)
        }
      }),
      h('span', { className: 'wl-tlab' }, h('b', null, fmtWhen(live ? now : T))),
      h('button', { type: 'button', className: `wl-now${live ? ' is-live' : ''}`, 'data-ctl': 'now', 'aria-label': t('wingline.fx.nowTip'), onClick: goLive }, t('wingline.fx.now'))
    )
  )
}

function planRetry(children) {
  return [
    { key: 'read', state: 'pending' },
    { key: 'create', state: 'pending' },
    ...children.flatMap(c => [
      { key: 'link', child: c, state: 'pending' },
      { key: 'unlink', child: c, state: 'pending' }
    ]),
    { key: 'comment', state: 'pending' },
    { key: 'archive', state: 'pending' }
  ]
}

function stepText(step, task, limitText, t) {
  if (step.key === 'read') return t('wingline.dlg.stepRead', task.id)
  if (step.key === 'create') return t('wingline.dlg.stepCreate', limitText)
  if (step.key === 'link') return t('wingline.dlg.stepLink', step.child)
  if (step.key === 'unlink') return t('wingline.dlg.stepUnlink', task.id, step.child)
  if (step.key === 'comment') return t('wingline.dlg.stepComment', task.id)
  return t('wingline.dlg.stepArchive', task.id)
}

function defaultLimit(task) {
  const old = isNum(task.max_runtime_seconds) && task.max_runtime_seconds > 0 ? task.max_runtime_seconds : null
  return old ? Math.max(1800, Math.round((old * 2) / 1800) * 1800) : 7200
}

function Dialog({ dlg, setDlg, onRetry, onNote, onArchive, t }) {
  const firstRef = useRef(null)
  const busy = dlg.phase === 'running'
  useEffect(() => {
    firstRef.current?.focus?.()
  }, [dlg.kind, dlg.phase])
  const close = () => {
    if (!busy) setDlg(null)
  }
  const onKey = e => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      close()
    }
  }
  const task = dlg.task
  let body
  let actions
  let title
  if (dlg.kind === 'retry') {
    title = t('wingline.dlg.retryTitle')
    const hours = parseFloat(dlg.hours)
    const okLimit = Number.isFinite(hours) && hours >= 0.5
    const limitSec = okLimit ? Math.round(hours * 3600) : 0
    const limitText = okLimit ? fmtDur(t, limitSec) : '—'
    const old = isNum(task.max_runtime_seconds) && task.max_runtime_seconds > 0 ? task.max_runtime_seconds : null
    const kids = dlg.steps.filter(s => s.key === 'link')
    body = h(
      'div',
      null,
      h('p', { className: 'wl-task' }, `${task.id} · ${task.title}`),
      h('p', { className: 'wl-callnote', 'data-note': 'why' }, t('wingline.dlg.retryWhy')),
      dlg.phase === 'confirm'
        ? h(
            'label',
            { className: 'wl-field' },
            t('wingline.dlg.limit'),
            h('input', {
              ref: firstRef,
              className: 'wl-input',
              type: 'number',
              min: 0.5,
              step: 0.5,
              value: dlg.hours,
              'data-field': 'limit',
              onChange: e => setDlg(d => ({ ...d, hours: e.target.value }))
            }),
            h('small', null, old ? t('wingline.dlg.limitOld', fmtDur(t, old)) : t('wingline.dlg.limitNone')),
            okLimit ? null : h('small', { role: 'alert' }, t('wingline.dlg.limitBad'))
          )
        : null,
      h('p', null, t('wingline.dlg.willHappen')),
      h(
        'ol',
        { className: 'wl-steps', 'data-steps': dlg.steps.length },
        dlg.steps.map((s, i) =>
          h(
            'li',
            { key: `${s.key}-${s.child || ''}-${i}`, 'data-step': s.key, 'data-state': s.state },
            h('i', { className: `wl-mark is-${s.state}` }),
            h('span', null, stepText(s, task, dlg.phase === 'confirm' ? limitText : fmtDur(t, dlg.limit), t)),
            h('span', { className: `wl-st is-${s.state}` }, t(`wingline.dlg.state.${s.state}`)),
            s.error ? h('span', { className: 'wl-serr', role: 'alert' }, t('wingline.dlg.failed', s.error)) : null
          )
        )
      ),
      kids.length ? null : h('p', null, t('wingline.dlg.noChildren')),
      h('p', { className: 'wl-callnote', 'data-note': 'retries' }, t('wingline.dlg.retriesNote')),
      dlg.newId ? h('p', null, t('wingline.dlg.newId', dlg.newId)) : null,
      dlg.phase === 'done' ? h('div', { className: 'wl-result', role: 'status' }, t('wingline.dlg.retryOk', dlg.newId)) : null,
      dlg.phase === 'failed' ? h('div', { className: 'wl-result is-failed', role: 'alert' }, t('wingline.dlg.stoppedAt')) : null
    )
    actions =
      dlg.phase === 'confirm'
        ? [
            h(Btn, { key: 'c', id: 'cancel', kind: 'ghost', label: t('wingline.dlg.cancel'), onClick: close }),
            h(Btn, { key: 'g', id: 'confirm', kind: 'primary', label: t('wingline.dlg.retryGo', limitText), disabled: !okLimit, onClick: () => onRetry(limitSec) })
          ]
        : [h(Btn, { key: 'x', id: 'close', label: t('wingline.dlg.close'), disabled: busy, onClick: close })]
  } else if (dlg.kind === 'note') {
    title = t('wingline.dlg.noteTitle')
    body = h(
      'div',
      null,
      h('p', { className: 'wl-task' }, `${task.id} · ${task.title}`),
      h('p', null, t('wingline.dlg.noteWill', task.id)),
      h('div', { className: 'wl-quote', 'data-quote': '1' }, dlg.text),
      dlg.phase === 'done' ? h('div', { className: 'wl-result', role: 'status' }, t('wingline.dlg.noteOk')) : null,
      dlg.phase === 'failed' ? h('div', { className: 'wl-result is-failed', role: 'alert' }, t('wingline.dlg.failed', dlg.error)) : null
    )
    actions =
      dlg.phase === 'confirm'
        ? [
            h(Btn, { key: 'c', id: 'cancel', kind: 'ghost', label: t('wingline.dlg.cancel'), onClick: close }),
            h('button', { key: 'g', ref: firstRef, type: 'button', className: 'wl-btn is-primary', 'data-act': 'confirm', onClick: onNote }, t('wingline.act.note'))
          ]
        : [h(Btn, { key: 'x', id: 'close', label: t('wingline.dlg.close'), disabled: busy, onClick: close })]
  } else {
    title = t('wingline.dlg.archiveTitle')
    body = h(
      'div',
      null,
      h('p', { className: 'wl-task' }, `${task.id} · ${task.title}`),
      h('p', null, t('wingline.dlg.archiveWill', task.id)),
      dlg.phase === 'sure' ? h('p', { className: 'wl-callnote', role: 'alert' }, t('wingline.dlg.archiveSecond')) : null,
      dlg.phase === 'done' ? h('div', { className: 'wl-result', role: 'status' }, t('wingline.dlg.archiveOk')) : null,
      dlg.phase === 'failed' ? h('div', { className: 'wl-result is-failed', role: 'alert' }, t('wingline.dlg.failed', dlg.error)) : null
    )
    actions =
      dlg.phase === 'confirm'
        ? [
            h(Btn, { key: 'c', id: 'cancel', kind: 'ghost', label: t('wingline.dlg.cancel'), onClick: close }),
            h('button', { key: 'g', ref: firstRef, type: 'button', className: 'wl-btn', 'data-act': 'confirm', onClick: () => setDlg(d => ({ ...d, phase: 'sure' })) }, t('wingline.dlg.archiveNext'))
          ]
        : dlg.phase === 'sure'
          ? [
              h(Btn, { key: 'c', id: 'cancel', kind: 'ghost', label: t('wingline.dlg.cancel'), onClick: close }),
              h('button', { key: 'g', ref: firstRef, type: 'button', className: 'wl-btn is-danger', 'data-act': 'confirm', onClick: onArchive }, t('wingline.dlg.archiveSure'))
            ]
          : [h(Btn, { key: 'x', id: 'close', label: t('wingline.dlg.close'), disabled: busy, onClick: close })]
  }
  return h(
    'div',
    {
      className: 'wl-scrim',
      onKeyDown: onKey,
      onClick: e => {
        if (e.target === e.currentTarget) close()
      }
    },
    h(
      'div',
      { className: 'wl-dlg', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'wl-dlg-h', 'data-dialog': dlg.kind, 'data-phase': dlg.phase },
      h('h2', { id: 'wl-dlg-h' }, title),
      body,
      h('div', { className: 'wl-dlg-actions' }, actions)
    )
  )
}

function Page() {
  const t = usePluginI18n(ID)
  const [board, setBoard] = useState(() => {
    const kept = readStore(BOARD_KEY, '')
    return typeof kept === 'string' ? kept : ''
  })
  const [view, setView] = useState(() => (readStore(VIEW_KEY, 'board') === 'factory' ? 'factory' : 'board'))
  const [data, setData] = useState(null)
  const [loadErr, setLoadErr] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [failures, setFailures] = useState([])
  const [selId, setSelId] = useState(null)
  const [fxOpen, setFxOpen] = useState(false)
  const [filter, setFilter] = useState(null)
  const [dlg, setDlg] = useState(null)
  const [notice, setNotice] = useState(null)
  const [log, setLog] = useState(null)
  const [note, setNote] = useState('')
  const seq = useRef(0)
  const tRef = useRef(t)
  tRef.current = t
  const load = useCallback(async () => {
    const mine = ++seq.current
    try {
      if (!ctxRef || typeof ctxRef.rest !== 'function') throw new Error(tRef.current('wingline.err.noRest'))
      const res = await ctxRef.rest(`/overview${board ? `?board=${enc(board)}` : ''}`)
      if (mine !== seq.current) return
      if (!res || !Array.isArray(res.tasks)) throw new Error(tRef.current('wingline.err.shape'))
      setData(res)
      setLoadErr(null)
      setUpdatedAt(Date.now())
    } catch (err) {
      if (mine !== seq.current) return
      console.warn(`[${ID}] reading the overview failed`, err)
      setLoadErr(errText(err))
    }
  }, [board])
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState !== 'hidden') load()
    }
    tick()
    const timer = window.setInterval(tick, POLL_MS)
    const onVis = () => {
      if (document.visibilityState === 'visible') load()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [load])
  useEffect(() => {
    if (!notice) return undefined
    const id = window.setTimeout(() => setNotice(null), 6000)
    return () => window.clearTimeout(id)
  }, [notice])
  const tasks = useMemo(() => (data && Array.isArray(data.tasks) ? data.tasks.filter(x => x && typeof x.id === 'string') : []), [data])
  const now = data && isNum(data.now) ? data.now : Date.now() / 1000
  const byId = useMemo(() => new Map(tasks.map(x => [x.id, x])), [tasks])
  const axis = useMemo(() => buildAxis(tasks, now), [tasks, now])
  const blocked = tasks.filter(x => x.status === 'blocked')
  const running = tasks.filter(x => x.status === 'running')
  const fallbackSel = (blocked[0] || running[0] || tasks[0] || {}).id || null
  const selected = byId.get(selId) || byId.get(fallbackSel) || null
  const boardSlug = data?.board || board
  const fail = useCallback((source, err) => {
    console.warn(`[${ID}] ${source} failed`, err)
    setFailures(f => [...f.slice(-5), { id: `${Date.now()}-${f.length}`, source, message: errText(err) }])
  }, [])
  const select = useCallback(id => {
    setSelId(id)
    setFxOpen(true)
  }, [])
  const pickView = v => {
    setView(v)
    writeStore(VIEW_KEY, v)
  }
  const pickBoard = slug => {
    setBoard(slug)
    writeStore(BOARD_KEY, slug)
    setData(null)
    setSelId(null)
    setLog(null)
  }
  const openLog = task => {
    setLog({ id: task.id, loading: true })
    kanbanCall(`/tasks/${enc(task.id)}/log?tail=${LOG_TAIL}`, boardSlug)
      .then(res => setLog({ id: task.id, loading: false, exists: res?.exists !== false, content: stripAnsi(res?.content || ''), truncated: !!res?.truncated }))
      .catch(err => {
        setLog({ id: task.id, loading: false, error: errText(err) })
        fail(t('wingline.act.log'), err)
      })
  }
  const askInChat = async task => {
    const text = t('wingline.chat.prompt', task.id, task.title, boardSlug, t(`wingline.status.${statusKey(task.status)}`), task.status === 'blocked' ? reasonOf(task, t) : '')
    let placed = false
    try {
      placed = !!(await host?.composer?.insertText?.(null, text))
    } catch (err) {
      console.warn(`[${ID}] the chat composer refused the question`, err)
    }
    if (placed) {
      setNotice(t('wingline.chat.inserted'))
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      setNotice(t('wingline.chat.copied'))
    } catch (err) {
      fail(t('wingline.act.chat'), err)
      setNotice(t('wingline.chat.failed'))
    }
  }
  const onAction = (kind, task) => {
    if (kind === 'retry') {
      setDlg({ kind: 'retry', task, phase: 'confirm', hours: String(defaultLimit(task) / 3600), steps: planRetry((task.children || []).slice()) })
    } else if (kind === 'archive') setDlg({ kind: 'archive', task, phase: 'confirm' })
    else if (kind === 'note') {
      if (note.trim()) setDlg({ kind: 'note', task, phase: 'confirm', text: note.trim() })
    } else if (kind === 'log') openLog(task)
    else if (kind === 'log-close') setLog(null)
    else if (kind === 'kanban') host?.navigate?.('/kanban')
    else if (kind === 'chat') askInChat(task)
  }
  const runRetry = async limit => {
    const task = dlg.task
    const slug = boardSlug
    let steps = dlg.steps.map(s => ({ ...s, state: 'pending', error: undefined }))
    const push = patch => setDlg(d => (d && d.task.id === task.id ? { ...d, ...patch } : d))
    let i = 0
    const mark = (state, error) => {
      steps = steps.map((s, k) => (k === i ? { ...s, state, error } : s))
      push({ steps })
    }
    const step = async fn => {
      mark('running')
      try {
        const out = await fn()
        mark('done')
        i += 1
        return out
      } catch (err) {
        mark('failed', errText(err))
        throw err
      }
    }
    push({ phase: 'running', limit, steps })
    try {
      const detail = await step(() => kanbanCall(`/tasks/${enc(task.id)}`, slug))
      const src = detail?.task || {}
      const kids = Array.isArray(detail?.links?.children) ? detail.links.children : task.children || []
      const parents = Array.isArray(detail?.links?.parents) ? detail.links.parents : task.parents || []
      steps = [steps[0], ...planRetry(kids).slice(1)]
      push({ steps })
      const newId = await step(async () => {
        const res = await kanbanCall('/tasks', slug, {
          method: 'POST',
          body: {
            title: src.title ?? task.title,
            body: src.body ?? null,
            assignee: src.assignee ?? task.assignee ?? null,
            tenant: src.tenant ?? null,
            priority: isNum(src.priority) ? src.priority : 0,
            parents,
            skills: src.skills ?? null,
            goal_mode: !!src.goal_mode,
            goal_max_turns: src.goal_max_turns ?? null,
            model_override: src.model_override ?? null,
            provider_override: src.provider_override ?? null,
            reasoning_effort: src.reasoning_effort ?? null,
            workspace_kind: src.workspace_kind ?? null,
            workspace_path: src.workspace_path ?? null,
            project_id: src.project_id ?? null,
            max_runtime_seconds: limit
          }
        })
        const id = res?.task?.id
        if (!id) throw new Error(t('wingline.err.noId'))
        return id
      })
      push({ newId })
      for (const child of kids) {
        await step(() => kanbanCall('/links', slug, { method: 'POST', body: { parent_id: newId, child_id: child } }))
        await step(async () => {
          const res = await kanbanCall(`/links?parent_id=${enc(task.id)}&child_id=${enc(child)}`, slug, { method: 'DELETE' })
          if (res && res.ok === false) throw new Error(t('wingline.err.refused'))
        })
      }
      await step(() => kanbanCall(`/tasks/${enc(task.id)}/comments`, slug, { method: 'POST', body: { body: t('wingline.dlg.retryComment', newId, fmtDur(t, limit)), author: 'wingline' } }))
      await step(async () => {
        const res = await kanbanCall(`/tasks/${enc(task.id)}`, slug, { method: 'PATCH', body: { status: 'archived' } })
        if (res?.task && res.task.status !== 'archived') throw new Error(t('wingline.err.refused'))
      })
      push({ phase: 'done' })
      setSelId(newId)
    } catch (err) {
      fail(t('wingline.act.retry'), err)
      push({ phase: 'failed' })
    }
    load()
  }
  const runNote = async () => {
    const { task, text } = dlg
    setDlg(d => ({ ...d, phase: 'running' }))
    try {
      await kanbanCall(`/tasks/${enc(task.id)}/comments`, boardSlug, { method: 'POST', body: { body: text, author: 'wingline' } })
      setDlg(d => ({ ...d, phase: 'done' }))
      setNote('')
    } catch (err) {
      fail(t('wingline.act.note'), err)
      setDlg(d => ({ ...d, phase: 'failed', error: errText(err) }))
    }
    load()
  }
  const runArchive = async () => {
    const { task } = dlg
    setDlg(d => ({ ...d, phase: 'running' }))
    try {
      const res = await kanbanCall(`/tasks/${enc(task.id)}`, boardSlug, { method: 'PATCH', body: { status: 'archived' } })
      if (res?.task && res.task.status !== 'archived') throw new Error(t('wingline.err.refused'))
      setDlg(d => ({ ...d, phase: 'done' }))
    } catch (err) {
      fail(t('wingline.act.archive'), err)
      setDlg(d => ({ ...d, phase: 'failed', error: errText(err) }))
    }
    load()
  }
  const totals = data?.totals || {}
  const counters = [
    { k: 'needs', v: totals.needs_you, tone: 'var(--ui-yellow)', alert: (totals.needs_you || 0) > 0 },
    { k: 'working', v: totals.working, tone: 'var(--ui-accent)' },
    { k: 'queued', v: totals.queued, tone: 'var(--ui-text-tertiary)' },
    { k: 'done', v: totals.done, tone: 'var(--ui-green)' }
  ]
  const problems = [
    ...(loadErr ? [{ id: 'overview', source: t('wingline.problems.overview'), message: loadErr }] : []),
    ...(Array.isArray(data?.errors) ? data.errors : []).map((e, i) => ({ id: `be-${i}`, source: t('wingline.problems.backend', String(e?.source || '')), message: String(e?.message || '') })),
    ...failures
  ]
  const boards = Array.isArray(data?.boards) ? data.boards : []
  const drawerProps = { task: selected, byId, now, t, onAction, log, note, setNote }
  let content
  if (!data) {
    content = loadErr
      ? h('div', { className: 'wl-state', role: 'alert' }, loadErr, h(Btn, { id: 'reload', icon: 'retry', label: t('wingline.tryAgain'), onClick: () => load() }))
      : h('div', { className: 'wl-state', role: 'status' }, t('wingline.loading'))
  } else if (!tasks.length) {
    content = h('div', { className: 'wl-state' }, t('wingline.empty'))
  } else if (view === 'factory') {
    content = h(Factory, {
      tasks,
      now,
      axis,
      selId: fxOpen ? selected?.id : null,
      onSelect: select,
      onNotice: setNotice,
      t,
      drawer: fxOpen && selected ? h(Drawer, { ...drawerProps, className: 'wl-fx-dr', onClose: () => setFxOpen(false) }) : null
    })
  } else {
    content = h(
      'div',
      { className: 'wl-board' },
      h(
        'main',
        { className: 'wl-main' },
        h(NeedsYou, { list: blocked, selId: selected?.id, onSelect: setSelId, onAction, now, t }),
        h(WorkingNow, { list: running, tasks, selId: selected?.id, onSelect: setSelId, now, t }),
        h(Pipeline, { tasks, selId: selected?.id, onSelect: setSelId, now, t }),
        h(Timeline, { tasks, axis, selId: selected?.id, onSelect: setSelId, filter, now, t })
      ),
      h(Drawer, drawerProps)
    )
  }
  return h(
    'div',
    { className: 'wl-root', 'data-view': view },
    h('style', null, CSS),
    h(
      'header',
      { className: 'wl-top' },
      h('div', { className: 'wl-brand' }, h('h1', null, t('wingline.title')), h('span', null, t('wingline.subtitle'))),
      h(
        'select',
        { className: 'wl-select', 'aria-label': t('wingline.boardPick'), value: boardSlug || '', onChange: e => pickBoard(e.target.value) },
        boards.length
          ? boards.map(b => h('option', { key: b.slug, value: b.slug }, b.name || b.slug))
          : h('option', { value: boardSlug || '' }, boardSlug || '—')
      ),
      h(
        'div',
        { className: 'wl-seg', role: 'group', 'aria-label': t('wingline.view.label') },
        ['board', 'factory'].map(v => h('button', { key: v, type: 'button', 'data-view': v, 'aria-pressed': view === v ? 'true' : 'false', onClick: () => pickView(v) }, t(`wingline.view.${v}`)))
      ),
      h(
        'div',
        { className: 'wl-counts' },
        counters.map(c =>
          h(
            'button',
            {
              key: c.k,
              type: 'button',
              className: `wl-count${c.alert ? ' is-alert' : ''}`,
              'data-count': c.k,
              'aria-pressed': filter === c.k ? 'true' : 'false',
              'aria-label': `${t(`wingline.count.${c.k}`)}: ${isNum(c.v) ? c.v : '—'}. ${t('wingline.count.filter', t(`wingline.count.${c.k}`))}`,
              onClick: () => setFilter(f => (f === c.k ? null : c.k))
            },
            h('span', { className: 'wl-dot', style: { background: c.tone } }),
            h('b', null, isNum(c.v) ? String(c.v) : '—'),
            h('span', null, t(`wingline.count.${c.k}`))
          )
        ),
        h('span', { className: 'wl-count is-static', 'data-count': 'spend' }, h(Icon, { name: 'coin' }), h('b', null, isNum(totals.spend_usd) ? money(totals.spend_usd) : '—'), h('span', null, t('wingline.count.spend')))
      ),
      updatedAt ? h('span', { className: 'wl-updated' }, t('wingline.updated', new Date(updatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }))) : null
    ),
    problems.length
      ? h(
          'div',
          { className: 'wl-problems', role: 'alert' },
          h(
            'div',
            { className: 'wl-problems-head' },
            h(Icon, { name: 'alert' }),
            t('wingline.problems.title', problems.length),
            failures.length ? h(Btn, { id: 'dismiss', kind: 'ghost', label: t('wingline.problems.dismiss'), onClick: () => setFailures([]) }) : null
          ),
          h('ul', null, problems.map(p => h('li', { key: p.id }, h('b', null, p.source), `: ${p.message}`)))
        )
      : null,
    content,
    dlg ? h(Dialog, { dlg, setDlg, onRetry: runRetry, onNote: runNote, onArchive: runArchive, t }) : null,
    notice ? h('div', { className: 'wl-notice', role: 'status' }, h(Icon, { name: 'info' }), h('span', null, notice)) : null
  )
}

function navLabel() {
  const viaApp = ctxRef?.i18n?.t?.('wingline.nav')
  return viaApp && viaApp !== 'wingline.nav' ? viaApp : BUNDLES.en.wingline.nav
}

export default {
  id: ID,
  name: 'Wingline',
  register(ctx) {
    ctxRef = ctx
    ctx.i18n?.register?.(BUNDLES)
    ctx.register({ id: 'page', area: 'routes', data: { path: ROUTE }, render: () => jsx(Page, {}) })
    ctx.register({ id: 'nav', area: 'sidebar.nav', data: { path: ROUTE, label: navLabel(), codicon: 'pulse' } })
  }
}
