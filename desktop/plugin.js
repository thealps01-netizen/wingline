import { host, usePluginI18n } from '@hermes/plugin-sdk'
import { jsx, jsxs } from 'react/jsx-runtime'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const ID = 'wingline'
const ROUTE = '/wingline'
const POLL_MS = 5000
const GAP = 360
const KANBAN = '/api/plugins/kanban'
const VIEW_KEY = 'view'
const BOARD_KEY = 'board'
const LOG_TAIL = 131072
const BOX = { working: 260, timeline: 520, error: 160, log: 300, problems: 132, dialog: 720 }
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
      boardOpt: (name, n) => `${name} · ${n === 1 ? '1 task' : `${n} tasks`}`,
      raw: 'Raw error',
      view: { label: 'View', board: 'Board', factory: 'Factory' },
      count: { needs: 'Needs you', working: 'Working', queued: 'Queued', done: 'Done', spend: 'Spend', filter: label => `Show only ${label} in the timeline` },
      updated: s => `Updated ${s}`,
      loading: 'Loading the board…',
      empty: 'This board has no tasks yet.',
      tryAgain: 'Try again',
      unit: { s: n => `${n}s`, m: n => `${n}m`, ms: (m, s) => `${m}m ${s}s`, hm: (h, m) => (m ? `${h}h ${m}m` : `${h}h`) },
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
        lastStop: s => `Last one stopped ${s}.`,
        nothingYet: 'Nothing has run on this board yet.',
        elapsed: d => `running for ${d}`,
        limit: d => `limit ${d}`,
        noActivity: 'No activity reported yet.',
        ago: d => `${d} ago`
      },
      pipe: { title: 'Pipeline', sub: 'every group on this board', dep: 'waits for', seq: 'next attempt or review of the same work' },
      tl: {
        title: 'Timeline',
        sub: 'grouped by pipeline · idle stretches squeezed, working time at true length',
        task: 'Task',
        spent: 'Spent',
        other: 'Other tasks',
        group: (n, d, money) => `${n === 1 ? '1 task' : `${n} tasks`} · ${d} · ${money}`,
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
        details: 'Details',
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
        crates: n => (n === 1 ? '1 crate shipped' : `${n} crates shipped`),
        shipped: 'their cost',
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
  const sec = Math.round(s)
  if (sec < 60) return t('wingline.unit.s', sec)
  if (sec < 3600) return sec % 60 ? t('wingline.unit.ms', Math.floor(sec / 60), sec % 60) : t('wingline.unit.m', sec / 60)
  const m = Math.round(sec / 60)
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
const byStart = (a, b) => firstStart(a) - firstStart(b)
const titleKey = s =>
  String(s || '')
    .split(':')[0]
    .replace(/\s*\((?:retry|rerun)\)\s*$/i, '')
    .replace(/\s+(?:review|retry)$/i, '')
    .trim()

function groupsOf(tasks, t) {
  const ids = new Set(tasks.map(x => x.id))
  const groups = []
  let loose = []
  for (const c of components(tasks)) {
    if (c.length < 2) {
      loose.push(c[0])
      continue
    }
    const list = [...c].sort(byStart)
    const edges = []
    for (const x of list) for (const p of x.parents || []) if (ids.has(p)) edges.push({ from: p, to: x.id, kind: 'dep' })
    groups.push({ kind: 'chain', name: commonPrefix(list.map(x => x.title)) || list[0].title, tasks: list, edges })
  }
  const bucket = (list, keyOf, make) => {
    const by = new Map()
    for (const x of list) {
      const k = keyOf(x)
      if (!by.has(k)) by.set(k, [])
      by.get(k).push(x)
    }
    const rest = []
    for (const [k, l] of by) {
      if (k && l.length > 1) groups.push(make(k, [...l].sort(byStart)))
      else rest.push(...l)
    }
    return rest
  }
  loose = bucket(loose, x => titleKey(x.title).toLowerCase(), (k, l) => ({
    kind: 'pair',
    name: titleKey(l[0].title),
    tasks: l,
    edges: l.slice(1).map((x, i) => ({ from: l[i].id, to: x.id, kind: 'seq' }))
  }))
  loose = bucket(loose, x => String(x.title || '').split(' ')[0].toLowerCase(), (k, l) => ({
    kind: 'family',
    name: commonPrefix(l.map(x => x.title)) || k,
    tasks: l,
    edges: []
  }))
  if (loose.length) groups.push({ kind: 'other', name: t('wingline.tl.other'), tasks: [...loose].sort(byStart), edges: [], other: true })
  groups.sort((a, b) => (a.other ? 1 : 0) - (b.other ? 1 : 0) || firstStart(a.tasks[0]) - firstStart(b.tasks[0]))
  return groups
}

function shortTitle(task, prefix) {
  const title = String(task?.title || '')
  if (!prefix || !title.startsWith(prefix) || title.length <= prefix.length + 1) return title
  return title.slice(prefix.length).replace(/^[\s:·—-]+/, '') || title
}

const NODE = { w: 188, h: 48, gx: 40, gy: 8, pad: 10 }

function groupLayout(g) {
  const inGroup = new Map(g.tasks.map(x => [x.id, x]))
  const col = new Map()
  if (g.kind === 'chain') {
    const visiting = new Set()
    const depthOf = x => {
      if (col.has(x.id)) return col.get(x.id)
      if (visiting.has(x.id)) return 0
      visiting.add(x.id)
      const ps = (x.parents || []).map(p => inGroup.get(p)).filter(Boolean)
      const d = ps.length ? Math.max(...ps.map(depthOf)) + 1 : 0
      visiting.delete(x.id)
      col.set(x.id, d)
      return d
    }
    g.tasks.forEach(depthOf)
  } else if (g.kind === 'pair') g.tasks.forEach((x, i) => col.set(x.id, i))
  else g.tasks.forEach(x => col.set(x.id, 0))
  const cols = []
  for (const x of g.tasks) {
    const d = col.get(x.id)
    if (!cols[d]) cols[d] = []
    cols[d].push(x)
  }
  const rows = Math.max(...cols.map(c => (c ? c.length : 0)))
  const inner = rows * NODE.h + (rows - 1) * NODE.gy
  const nodes = []
  cols.forEach((list, d) => {
    if (!list) return
    const colH = list.length * NODE.h + (list.length - 1) * NODE.gy
    list.forEach((x, k) => {
      nodes.push({ task: x, label: shortTitle(x, g.kind === 'other' ? '' : g.name), x: NODE.pad + d * (NODE.w + NODE.gx), y: NODE.pad + (inner - colH) / 2 + k * (NODE.h + NODE.gy) })
    })
  })
  const at = new Map(nodes.map(n => [n.task.id, n]))
  const edges = g.edges.filter(e => at.has(e.from) && at.has(e.to)).map(e => ({ ...e, key: `${e.from}>${e.to}`, a: at.get(e.from), b: at.get(e.to) }))
  return { nodes, edges, width: NODE.pad * 2 + cols.length * NODE.w + (cols.length - 1) * NODE.gx, height: NODE.pad * 2 + inner }
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
const CABLES = ['M486,262 C590,262 620,300 662,300', 'M486,440 L600,440 L640,470 L662,470']
const ZONE = {
  intake: { x: 40, y: 300, w: 186, h: 300 },
  dock: { x: 1290, y: 190, w: 272, h: 376 },
  bay: { x: 1110, y: 612, w: 452, h: 200 },
  scrap: { x: 48, y: 676, w: 166, h: 140 }
}
const CAP = { intake: 10, dock: 42, bay: 4, scrap: 12 }
const SCENE = { x: 14, y: 72, w: 1572, h: 812 }
const RC = { builder: '#3d7dd8', review: '#8b6fd6', gate: '#e2a336', detective: '#2fa58e' }
const RC_LIGHT = { builder: '#6d9de1', review: '#a893e0', gate: '#e9ba68', detective: '#63bcaa' }
const FS = { zone: 17, name: 16, tag: 16, note: 16, num: 16, sign: 28 }
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
  zones.machine.sort(byStart)
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

const INK = {
  bg0: '#ddd3c2',
  bg1: '#d2c7b4',
  floor0: '#f3ede2',
  floor1: '#ebe3d5',
  grid: 'rgba(120,95,55,.07)',
  intake: '#e6dece',
  intakeLine: '#cbbfa8',
  door: '#b9ae99',
  doorSlat: 'rgba(255,255,255,.25)',
  dock: '#e4d3b5',
  plank: 'rgba(120,85,40,.10)',
  scrap: '#e2ddd4',
  scrapLine: '#c6beb0',
  bed: '#3a4150',
  bedIn: '#4a5264',
  slat: 'rgba(255,255,255,.11)',
  redBed: '#2b2d33',
  yellow: '#f2c230',
  cable: '#c9bfae',
  cableIn: '#e9e2d6',
  label: '#776b58',
  ink: '#26303f',
  mute: '#5f6779',
  block0: '#fdfbf7',
  block1: '#ece5d8',
  lab1: '#e9e2d4',
  housing: '#2f3747',
  vent: 'rgba(255,255,255,.10)',
  rod: '#8a92a3',
  plate: 'rgba(40,30,10,.14)',
  inset: 'rgba(0,0,0,.15)',
  shine: 'rgba(255,255,255,.25)',
  glass: 'rgba(139,111,214,.08)',
  glassOn: 'rgba(139,111,214,.20)',
  glassLine: 'rgba(139,111,214,.55)',
  beam: 'rgba(196,181,253,.95)',
  scanNum: '#dfe3ec',
  disc0: '#ffd98a',
  ring: 'rgba(255,255,255,.6)',
  dome: 'rgba(47,165,142,.10)',
  liquid: 'rgba(47,165,142,.35)',
  liquidOn: 'rgba(47,165,142,.55)',
  domeLine: 'rgba(47,165,142,.6)',
  glint: 'rgba(255,255,255,.8)',
  lampIdle: '#8fd3a5',
  lampWork: '#2fd07a',
  lampRed: '#ff3b3b',
  lampAmber: '#ffb020',
  lampAmberDim: '#c98a1a',
  lampOff: '#d8d0c2',
  lampHi: 'rgba(255,255,255,.7)',
  crateLid: '#efd7ae',
  crate0: '#dcb784',
  crate1: '#c99c64',
  tape: '#c9985e',
  shade: 'rgba(0,0,0,.06)',
  crateShadow: 'rgba(60,40,10,.22)',
  crateHi: 'rgba(255,255,255,.35)',
  scrapLid: '#d8d4cc',
  scrap0: '#c9c3b8',
  scrap1: '#b9b2a6',
  scrapTape: '#bdb6aa',
  scrapTag: '#9aa0ab',
  red: '#e5484d',
  redText: '#c0353a',
  amber: '#e9a23b',
  amberText: '#8f5c12',
  white: '#ffffff',
  card: '#fffdf8',
  bin: '#efe7dc',
  binOn: '#f5e6e0',
  binLine: '#3a4150',
  binOff: '#cfc5b4',
  halo: 'rgba(229,72,77,.14)',
  ringRed: 'rgba(229,72,77,.55)',
  shadow: '#3c280a',
  smoke: '#5f626b'
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
.wl-root{container:wl/inline-size;position:relative;min-height:100%;box-sizing:border-box;padding:0 0 24px;color:var(--ui-text-primary);background:var(--ui-bg-chrome);font-size:13px;line-height:1.5}
.wl-root *{box-sizing:border-box}
.wl-root button{font:inherit;color:inherit;cursor:pointer}
.wl-root :focus-visible{outline:2px solid var(--ui-accent);outline-offset:2px;border-radius:6px}
.wl-root ::selection{background:color-mix(in srgb,var(--ui-accent) 35%,transparent)}
.wl-i{flex:none;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.wl-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px}
.wl-muted{margin:4px 0;color:var(--ui-text-tertiary);font-size:12.5px}
.wl-top{position:sticky;top:0;z-index:6;display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;padding:12px 24px;background:var(--ui-bg-chrome);border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-brand{display:flex;flex-direction:column;min-width:0}
.wl-brand h1{margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}
.wl-brand span{font-size:12px;color:var(--ui-text-tertiary)}
.wl-select{height:30px;max-width:260px;padding:0 8px;border-radius:8px;border:1px solid var(--ui-stroke-secondary);background:var(--ui-bg-editor);color:var(--ui-text-primary);font:inherit}
.wl-seg{display:inline-flex;gap:2px;padding:3px;background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);border-radius:10px}
.wl-seg button{border:0;background:none;padding:4px 12px;border-radius:7px;color:var(--ui-text-secondary);font-weight:500}
.wl-seg button:hover{color:var(--ui-text-primary)}
.wl-seg button[aria-pressed=true]{background:var(--ui-bg-elevated);color:var(--ui-text-primary)}
.wl-counts{display:flex;flex-wrap:wrap;gap:4px;margin-left:auto}
.wl-count{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:9px;border:1px solid transparent;background:none;color:var(--ui-text-secondary);font-size:12.5px}
.wl-count b{color:var(--ui-text-primary);font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-count:hover{background:var(--ui-bg-secondary);border-color:var(--ui-stroke-tertiary)}
.wl-count[aria-pressed=true]{background:var(--ui-bg-secondary);border-color:var(--ui-stroke-secondary)}
.wl-count.is-alert{border-color:color-mix(in srgb,var(--ui-yellow) 45%,transparent);background:color-mix(in srgb,var(--ui-yellow) 10%,transparent)}
.wl-count .wl-dot{width:8px;height:8px;border-radius:50%}
.wl-count.is-static{cursor:default}
.wl-count.is-static:hover{background:none;border-color:transparent}
.wl-updated{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-problems{margin:12px 24px 0;padding:8px 12px;border-radius:10px;border:1px solid color-mix(in srgb,var(--ui-red) 45%,transparent);background:color-mix(in srgb,var(--ui-red) 8%,var(--ui-bg-chrome));max-height:${BOX.problems}px;overflow:auto}
.wl-problems-head{display:flex;align-items:center;gap:8px;font-weight:600}
.wl-problems-head .wl-i{stroke:var(--ui-red)}
.wl-problems ul{margin:4px 0 0;padding-left:24px;font-size:12.5px;color:var(--ui-text-secondary)}
.wl-problems li{overflow-wrap:anywhere}
.wl-problems li b{color:var(--ui-text-primary);font-weight:600}
.wl-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;background:var(--ui-bg-tertiary);border:1px solid var(--ui-stroke-secondary);color:var(--ui-text-primary);font-size:12.5px;font-weight:500;white-space:nowrap}
.wl-btn:hover{background:var(--ui-control-hover-background)}
.wl-btn.is-primary{background:var(--ui-text-primary);border-color:var(--ui-text-primary);color:var(--ui-bg-chrome)}
.wl-btn.is-primary:hover{opacity:.9;background:var(--ui-text-primary)}
.wl-btn.is-danger{background:var(--ui-red);border-color:var(--ui-red);color:var(--ui-bg-chrome)}
.wl-btn.is-ghost{background:none;border-color:transparent;color:var(--ui-text-secondary)}
.wl-btn.is-ghost:hover{background:var(--ui-bg-tertiary);color:var(--ui-text-primary)}
.wl-btn[disabled]{opacity:.45;cursor:default}
.wl-state{display:flex;flex-direction:column;align-items:flex-start;gap:8px;margin:24px;padding:16px 20px;border-radius:12px;border:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-secondary);color:var(--ui-text-secondary)}
.wl-main{min-width:0;display:flex;flex-direction:column;gap:24px;padding:20px 24px;max-width:1280px}
.wl-h2{margin:0 0 8px;font-size:13px;font-weight:600;display:flex;align-items:baseline;gap:8px;color:var(--ui-text-secondary)}
.wl-h2 small{font-weight:400;color:var(--ui-text-tertiary);font-size:12px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-sec.is-needs>.wl-h2{font-size:15px;color:var(--ui-text-primary)}
.wl-h4{margin:16px 0 8px;font-size:12.5px;font-weight:600;color:var(--ui-text-secondary)}
.wl-panel{background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);border-radius:12px;min-width:0}
.wl-slim{display:flex;align-items:center;gap:8px;margin:0;min-height:32px;padding:6px 12px;border-radius:9px;background:var(--ui-bg-secondary);color:var(--ui-text-secondary);font-size:12.5px;white-space:nowrap;overflow:hidden}
.wl-slim b{color:var(--ui-text-primary);font-weight:600}
.wl-slim span{overflow:hidden;text-overflow:ellipsis}
.wl-needs{display:flex;flex-direction:column;gap:12px}
.wl-attn{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;padding:16px 20px;cursor:pointer;border-radius:12px;border:1px solid color-mix(in srgb,var(--ui-yellow) 55%,var(--ui-stroke-tertiary));background:color-mix(in srgb,var(--ui-yellow) 7%,var(--ui-bg-secondary))}
.wl-attn:hover{border-color:var(--ui-yellow)}
.wl-attn.is-sel{border-color:var(--ui-yellow);box-shadow:0 0 0 1px var(--ui-yellow)}
.wl-badge{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--ui-yellow) 18%,transparent);color:var(--ui-yellow)}
.wl-attn-body{min-width:0}
.wl-attn h3{margin:0;font-size:16px;font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.wl-reason{margin:4px 0 0;font-size:14px;color:var(--ui-text-primary);max-width:90ch;overflow-wrap:anywhere}
.wl-facts{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px;font-size:12px;color:var(--ui-text-tertiary);font-variant-numeric:tabular-nums}
.wl-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.wl-rawbox{margin-top:8px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-rawbox summary{cursor:pointer;width:max-content}
.wl-rawbox summary:hover{color:var(--ui-text-secondary)}
.wl-rawtext{margin:6px 0 0;max-height:${BOX.error}px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:8px 10px;border-radius:8px;background:var(--ui-bg-editor);color:var(--ui-text-secondary)}
.wl-work{display:flex;flex-direction:column;gap:8px;max-height:${BOX.working}px;overflow:auto}
.wl-wrow{flex:none;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;padding:12px 16px;cursor:pointer;border-color:color-mix(in srgb,var(--ui-accent) 40%,var(--ui-stroke-tertiary))}
.wl-wrow.is-sel{border-color:var(--ui-accent)}
.wl-wtitle{display:flex;align-items:center;gap:8px;min-width:0;font-weight:600}
.wl-wtitle span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-wmeta{font-size:12px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-wact{grid-column:1/-1;font-size:12px;color:var(--ui-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-bar{grid-column:1/-1;height:4px;border-radius:2px;background:var(--ui-bg-tertiary);overflow:hidden}
.wl-bar i{display:block;height:100%;background:var(--ui-accent)}
.wl-pipes{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}
.wl-pipe{margin:0;padding:8px 8px 4px;border-radius:12px;background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);max-width:100%;overflow-x:auto}
.wl-pipe figcaption{display:flex;align-items:baseline;gap:8px;padding:0 4px 4px;font-size:12.5px;min-width:0}
.wl-pipe figcaption b{font-weight:600;white-space:nowrap}
.wl-pipe figcaption span{color:var(--ui-text-tertiary);font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-pipe svg{display:block}
.wl-node{cursor:pointer;outline:none}
.wl-card{fill:var(--ui-bg-tertiary);stroke:var(--ui-stroke-secondary);stroke-width:1}
.wl-node:hover .wl-card,.wl-node:focus-visible .wl-card,.wl-node.is-sel .wl-card{stroke:var(--ui-accent);stroke-width:1.5}
.wl-edge{stroke:var(--ui-stroke-primary);stroke-width:1.5;fill:none}
.wl-edge.is-seq{stroke-dasharray:4 4}
.wl-arrow{fill:var(--ui-stroke-primary)}
.wl-nt{height:100%;padding:6px 8px 0 24px;font-size:12.5px;line-height:1.35;pointer-events:none}
.wl-nt b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-nt span{display:block;color:var(--ui-text-tertiary);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.wl-key{display:flex;gap:16px;margin:8px 0 0;font-size:12px;color:var(--ui-text-tertiary)}
.wl-key span{display:inline-flex;align-items:center;gap:6px}
.wl-key i{display:inline-block;width:18px;border-top:1.5px solid var(--ui-stroke-primary)}
.wl-key i.is-seq{border-top-style:dashed}
.wl-tl{overflow:hidden}
.wl-tl-head,.wl-tl-row{display:grid;grid-template-columns:minmax(140px,260px) minmax(0,1fr) 64px;gap:12px;align-items:center}
.wl-tl-head{font-size:11.5px;color:var(--ui-text-tertiary);height:28px;padding:0 16px;border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-tl-cost{text-align:right}
.wl-ticks{position:relative;height:100%}
.wl-ticks span{position:absolute;top:6px;white-space:nowrap;transform:translateX(-50%);font-variant-numeric:tabular-nums}
.wl-tl-body{max-height:${BOX.timeline}px;overflow:auto;padding:0 0 4px}
.wl-tl-group{display:flex;align-items:baseline;gap:8px;min-width:0;height:26px;padding:6px 16px 0;font-size:12px;font-weight:600;color:var(--ui-text-secondary)}
.wl-tl-group span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-tl-group em{font-style:normal;font-weight:400;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-tl-row{height:24px;cursor:pointer;border-radius:6px;margin:0 4px;padding:0 12px;font-size:12.5px}
.wl-tl-row:hover{background:var(--ui-row-hover-background)}
.wl-tl-row.is-sel{background:var(--ui-row-active-background)}
.wl-tl-row.is-dim{opacity:.35}
.wl-tl-name{display:flex;align-items:center;gap:8px;min-width:0}
.wl-tl-name span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-role{width:8px;height:8px;border-radius:2px;flex:none;display:inline-block}
.wl-track{position:relative;height:16px}
.wl-gridline{position:absolute;top:-4px;bottom:-4px;width:1px;background:var(--ui-stroke-quaternary)}
.wl-run{position:absolute;top:4px;height:8px;border-radius:4px;min-width:6px}
.wl-k-ok{background:var(--ui-green)}
.wl-k-paused{background:var(--ui-yellow)}
.wl-k-running{background:var(--ui-accent)}
.wl-k-stopped{background:var(--ui-red)}
.wl-cost{text-align:right;font-size:12px;color:var(--ui-text-secondary);font-variant-numeric:tabular-nums}
.wl-legend{display:flex;gap:16px;flex-wrap:wrap;padding:8px 16px;font-size:12px;color:var(--ui-text-tertiary);border-top:1px solid var(--ui-stroke-tertiary)}
.wl-legend span{display:inline-flex;align-items:center;gap:6px}
.wl-legend i{display:inline-block;width:14px;height:8px;border-radius:4px}
.wl-roles{margin-left:auto;gap:12px!important}
.wl-sheet{position:fixed;z-index:30;top:0;right:0;height:100vh;width:min(440px,100vw);display:flex;flex-direction:column;background:var(--ui-bg-elevated);border-left:1px solid var(--ui-stroke-secondary);box-shadow:-12px 0 32px color-mix(in srgb,var(--ui-bg-chrome) 55%,transparent);overflow-wrap:anywhere}
.wl-sheet-head{flex:none;padding:16px 20px 12px;border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-sheet-top{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-sheet-top .wl-x{margin-left:auto}
.wl-x{border:0;background:var(--ui-bg-tertiary);border-radius:8px;width:28px;height:28px;display:grid;place-items:center}
.wl-x:hover{background:var(--ui-control-hover-background)}
.wl-sheet h3{margin:8px 0;font-size:16px;font-weight:600;line-height:1.3}
.wl-sheet-body{flex:1;min-height:0;overflow:auto;padding:12px 20px 16px}
.wl-sheet-why{margin:0 0 12px;font-size:13.5px}
.wl-sheet-foot{flex:none;display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;border-top:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-elevated)}
.wl-status{display:inline-flex;align-items:center;gap:6px;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;background:var(--ui-bg-tertiary);border:1px solid var(--ui-stroke-tertiary)}
.wl-status i{width:7px;height:7px;border-radius:50%}
.wl-dl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin:0 0 12px;background:var(--ui-stroke-tertiary);border-radius:10px;overflow:hidden}
.wl-dl div{background:var(--ui-bg-tertiary);padding:8px 10px;min-width:0}
.wl-dl dt{font-size:11.5px;color:var(--ui-text-tertiary)}
.wl-dl dd{margin:2px 0 0;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-dl dd small{display:block;font-size:11.5px;font-weight:400;color:var(--ui-text-tertiary)}
.wl-kv{display:grid;grid-template-columns:96px minmax(0,1fr);gap:4px 12px;font-size:12.5px}
.wl-kv>span:nth-child(odd){color:var(--ui-text-tertiary)}
.wl-attempts{margin:0;padding:0;list-style:none;position:relative}
.wl-attempts:before{content:"";position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:var(--ui-stroke-secondary)}
.wl-attempts li{position:relative;padding:0 0 12px 24px;font-size:12.5px}
.wl-attempts li>i{position:absolute;left:0;top:4px;width:11px;height:11px;border-radius:50%;background:var(--ui-bg-elevated);border:2px solid var(--ui-text-tertiary)}
.wl-attempts li.is-ok>i{border-color:var(--ui-green)}
.wl-attempts li.is-stopped>i{border-color:var(--ui-red)}
.wl-attempts li.is-paused>i{border-color:var(--ui-yellow)}
.wl-attempts li.is-running>i{border-color:var(--ui-accent)}
.wl-att-line{display:flex;gap:8px;align-items:baseline}
.wl-att-line span{color:var(--ui-text-tertiary);font-size:12px}
.wl-att-out{display:flex;gap:8px;font-variant-numeric:tabular-nums}
.wl-att-out span:first-child{font-weight:600}
.wl-attempts small{display:block;color:var(--ui-text-tertiary);font-size:12px}
.wl-log{margin-top:16px}
.wl-log-head{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-weight:600}
.wl-log-head .wl-btn{margin-left:auto}
.wl-logpre{margin:0;max-height:${BOX.log}px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:10px;border-radius:10px;background:var(--ui-bg-editor);color:var(--ui-text-secondary);line-height:1.45}
.wl-note{margin-top:4px}
.wl-input{width:100%;background:var(--ui-bg-editor);border:1px solid var(--ui-stroke-secondary);border-radius:9px;padding:8px 10px;color:var(--ui-text-primary);font:inherit}
.wl-input:focus{outline:none;border-color:var(--ui-accent)}
textarea.wl-input{min-height:64px;resize:vertical}
.wl-note .wl-btn{margin-top:8px}
.wl-notice{position:fixed;right:24px;bottom:24px;z-index:40;display:flex;gap:10px;align-items:flex-start;max-width:420px;padding:12px 14px;border-radius:12px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);font-size:12.5px}
.wl-notice .wl-i{stroke:var(--ui-accent);margin-top:2px}
.wl-fx{padding:12px 24px 16px;min-width:0}
.wl-fx-bar{display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap}
.wl-pill{display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:999px;border:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-secondary);white-space:nowrap}
.wl-pill i{width:9px;height:9px;border-radius:50%;background:var(--ui-green)}
.wl-pill.is-replay i{background:var(--ui-blue)}
.wl-pill b{font-weight:600}
.wl-pill span{color:var(--ui-text-tertiary)}
.wl-clock{display:flex;align-items:baseline;gap:8px;line-height:1.1;padding-left:12px;border-left:1px solid var(--ui-stroke-tertiary)}
.wl-clock small{font-size:12px;color:var(--ui-text-tertiary)}
.wl-clock b{font-size:17px;font-weight:600;font-variant-numeric:tabular-nums}
.wlf-stage{position:relative;width:min(100%,calc((100vh - 200px) * ${SCENE.w / SCENE.h}));min-width:min(100%,640px);margin:0 auto;border-radius:16px;overflow:hidden;background:linear-gradient(${INK.bg0},${INK.bg1})}
.wlf-svg{display:block;width:100%;height:auto;font-family:inherit}
.wl-ctrl{display:flex;align-items:center;gap:10px;width:min(100%,calc((100vh - 200px) * ${SCENE.w / SCENE.h}));min-width:min(100%,640px);margin:8px auto 0;padding:6px 8px;border:1px solid var(--ui-stroke-tertiary);border-radius:12px;background:var(--ui-bg-secondary)}
.wl-ctrl input[type=range]{flex:1;min-width:80px;accent-color:var(--ui-accent)}
.wl-tlab{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-tlab b{color:var(--ui-text-primary);font-weight:600}
.wl-root .wl-play{border:0;width:34px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--ui-text-primary);color:var(--ui-bg-chrome)}
.wl-play .wl-i{fill:currentColor}
.wl-now{border:1px solid var(--ui-stroke-secondary);height:30px;padding:0 12px;border-radius:9px;background:var(--ui-bg-tertiary);font-weight:600}
.wl-now.is-live{background:var(--ui-green);border-color:var(--ui-green);color:var(--ui-bg-chrome)}
.wlf-zone-l{font-size:${FS.zone}px;font-weight:600;letter-spacing:1.6px}
.wlf-name{font-size:${FS.name}px;font-weight:600;letter-spacing:1.2px}
.wlf-note{font-size:${FS.note}px;font-weight:500}
.wlf-num{font-size:${FS.num}px;font-weight:700}
.wlf-sign{font-size:${FS.sign}px;font-weight:600;font-variant-numeric:tabular-nums}
.wlf-binhead{font-size:${FS.note}px;font-weight:600;letter-spacing:1px}
.wlf-slats{opacity:0}
.wlf-svg[data-moving="1"] .wlf-slats{opacity:1;animation:wlf-run 1.1s linear infinite}
.wlf-svg[data-moving="1"] .wlf-redslats{animation:wlf-run 1.4s linear infinite}
.wlf-m{cursor:pointer;outline:none}
.wlf-m-focus{fill:none;stroke:transparent;stroke-width:2;stroke-dasharray:5 4}
.wlf-m:hover .wlf-m-focus,.wlf-m:focus-visible .wlf-m-focus{stroke:${INK.ink}}
.wlf-press,.wlf-stamp,.wlf-beam,.wlf-glass{transform-box:view-box}
.wlf-press.is-work{animation:wlf-press 1.05s ease-in-out infinite}
.wlf-press.is-jam{transform:translateY(14px)}
.wlf-stamp.is-work{animation:wlf-stamp 1.43s ease-in-out infinite}
.wlf-stamp.is-jam{transform:translateY(8px)}
.wlf-arm{transform-box:fill-box;transform-origin:top;transform:scaleY(.05)}
.wlf-arm.is-work{animation:wlf-arm 1.43s ease-in-out infinite}
.wlf-arm.is-jam{transform:scaleY(.35)}
.wlf-beam{animation:wlf-beam 1.5s ease-in-out infinite}
.wlf-glass.is-work{animation:wlf-glass 3.9s linear infinite;transform-origin:444px 752px}
.wlf-lamp-c{fill:${INK.lampIdle}}
.wlf-lamp.is-work .wlf-lamp-c{fill:${INK.lampWork};filter:drop-shadow(0 0 4px ${INK.lampWork})}
.wlf-lamp.is-crash .wlf-lamp-c{fill:${INK.lampRed};animation:wlf-crash .52s steps(1) infinite;filter:drop-shadow(0 0 6px ${INK.lampRed})}
.wlf-lamp.is-pause .wlf-lamp-c{fill:${INK.lampAmber};animation:wlf-pause 1s steps(1) infinite}
.wlf-pkg{cursor:pointer;outline:none;transition:transform .7s cubic-bezier(.16,1,.3,1)}
.wlf-pkg.is-scrap{opacity:.55}
.wlf-pkg-focus{fill:none;stroke:transparent;stroke-width:2}
.wlf-pkg:hover .wlf-pkg-focus,.wlf-pkg:focus-visible .wlf-pkg-focus{stroke:${INK.ink}}
.wlf-ring{transform-box:fill-box;transform-origin:center;animation:wlf-ring 2.8s ease-out infinite}
.wlf-smoke circle{opacity:.3;transform-box:fill-box;transform-origin:center;animation:wlf-smoke 2.4s ease-out infinite}
.wlf-smoke circle:nth-child(2){animation-delay:.8s}
.wlf-smoke circle:nth-child(3){animation-delay:1.6s}
.wlf-fo{overflow:visible}
.wlf-tag{height:100%;display:flex;align-items:center;justify-content:center;pointer-events:none}
.wlf-tag.is-start{justify-content:flex-start}
.wlf-tag span{display:inline-flex;align-items:center;gap:8px;max-width:100%;height:28px;padding:0 14px 0 10px;border-radius:14px;background:${INK.card};color:${INK.ink};box-shadow:0 3px 8px ${INK.crateShadow};font-size:${FS.tag}px;font-weight:500;white-space:nowrap}
.wlf-tag em{font-style:normal;overflow:hidden;text-overflow:ellipsis}
.wlf-tag i{width:9px;height:9px;border-radius:50%;flex:none}
.wlf-tag.is-crash span{background:${INK.red};color:${INK.white};padding-left:14px}
.wlf-tag.is-pause span{background:${INK.amber};color:${INK.ink};padding-left:14px}
.wlf-call{height:100%;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:8px 14px 8px 20px;border-radius:14px;background:${INK.card};color:${INK.ink};box-shadow:0 6px 18px ${INK.crateShadow},inset 6px 0 0 ${INK.red};cursor:pointer;min-width:0;line-height:1.3}
.wlf-call.is-pause{box-shadow:0 6px 18px ${INK.crateShadow},inset 6px 0 0 ${INK.amber}}
.wlf-call:focus-visible{outline:2px solid ${INK.ink};outline-offset:2px}
.wlf-call small{font-size:${FS.note}px;font-weight:600;letter-spacing:1.2px;color:${INK.redText}}
.wlf-call.is-pause small,.wlf-call.is-pause em{color:${INK.amberText}}
.wlf-call b{font-size:18px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wlf-call span{font-size:${FS.note}px;color:${INK.mute};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.wlf-call em{font-style:normal;font-size:${FS.note}px;font-weight:600;color:${INK.redText}}
.wl-scrim{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:24px;background:color-mix(in srgb,var(--ui-bg-chrome) 72%,transparent)}
.wl-dlg{width:min(620px,100%);max-height:min(${BOX.dialog}px,100%);overflow:auto;padding:20px 24px;border-radius:14px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);color:var(--ui-text-primary);overflow-wrap:anywhere}
.wl-dlg h2{margin:0 0 8px;font-size:16px;font-weight:600}
.wl-dlg p{margin:8px 0;color:var(--ui-text-secondary)}
.wl-dlg .wl-task{font-weight:600;color:var(--ui-text-primary)}
.wl-steps{margin:12px 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}
.wl-steps li{display:grid;grid-template-columns:14px minmax(0,1fr) auto;gap:8px;align-items:start;font-size:12.5px}
.wl-steps .wl-st{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap}
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
.wl-result{margin-top:12px;padding:8px 10px;border-radius:8px;border:1px solid color-mix(in srgb,var(--ui-green) 50%,transparent);background:var(--ui-bg-secondary)}
.wl-result.is-failed{border-color:color-mix(in srgb,var(--ui-red) 50%,transparent)}
.wl-dlg-actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;margin-top:16px}
@keyframes wlf-run{to{stroke-dashoffset:-22}}
@keyframes wlf-press{0%,62%,100%{transform:translateY(0)}22%,30%{transform:translateY(20px)}}
@keyframes wlf-stamp{0%,62%,100%{transform:translateY(0)}18%,32%{transform:translateY(24px)}}
@keyframes wlf-arm{0%,62%,100%{transform:scaleY(.05)}18%,32%{transform:scaleY(1)}}
@keyframes wlf-beam{0%,100%{transform:translateX(0)}50%{transform:translateX(40px)}}
@keyframes wlf-glass{0%{transform:translate(4px,0)}25%{transform:translate(0,4px)}50%{transform:translate(-4px,0)}75%{transform:translate(0,-4px)}100%{transform:translate(4px,0)}}
@keyframes wlf-crash{50%{fill:${INK.lampAmber}}}
@keyframes wlf-pause{50%{fill:${INK.lampAmberDim}}}
@keyframes wlf-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}
@keyframes wlf-smoke{0%{transform:translate(0,0) scale(.6);opacity:.45}100%{transform:translate(18px,-64px) scale(1.9);opacity:0}}
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

const oneLine = (s, max = 160) => {
  const line = String(s || '').split('\n')[0].replace(/\s+/g, ' ').trim()
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line
}

const DUMP = /traceback|last output|^\s*(?:file |at )|\\x1b|\u001b/i

function reasonOf(task, t) {
  const plain = oneLine(task.block_reason_plain)
  if (plain) return plain
  const first = oneLine(task.error_plain)
  return first && !DUMP.test(first) ? first : t('wingline.needs.reasonUnknown')
}

function retriesText(task, t) {
  const used = isNum(task.consecutive_failures) ? task.consecutive_failures : 0
  return isNum(task.max_retries) ? t('wingline.needs.retries', used, task.max_retries) : t('wingline.needs.retriesNoMax', used)
}

function RawError({ text, t }) {
  const raw = stripAnsi(text).trim()
  if (!raw) return null
  return h(
    'details',
    { className: 'wl-rawbox', 'data-raw': '1', onClick: e => e.stopPropagation() },
    h('summary', null, t('wingline.raw')),
    h('pre', { className: 'wl-rawtext wl-mono' }, raw)
  )
}

function NeedsYou({ list, selId, onSelect, onAction, now, t }) {
  return h(
    'section',
    { className: 'wl-sec is-needs', 'aria-labelledby': 'wl-needs-h' },
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
                className: `wl-attn${task.id === selId ? ' is-sel' : ''}`,
                'data-id': task.id,
                onClick: () => onSelect(task.id)
              },
              h('div', { className: 'wl-badge' }, h(Icon, { name: 'alert', size: 18 })),
              h(
                'div',
                { className: 'wl-attn-body' },
                h('h3', null, task.title),
                h('p', { className: 'wl-reason', 'data-reason': '1' }, reasonOf(task, t)),
                h(
                  'div',
                  { className: 'wl-facts' },
                  h('span', null, retriesText(task, t)),
                  h('span', null, t('wingline.needs.worked', fmtDur(t, workSeconds(task, now)))),
                  h('span', null, t('wingline.needs.attempts', runsOf(task).length)),
                  h('span', null, money(task.cost?.usd)),
                  r && isNum(r.ended_at) ? h('span', null, t('wingline.needs.stopped', fmtWhen(r.ended_at))) : null
                ),
                h(RawError, { text: task.error_raw || task.error_plain, t }),
                h(
                  'div',
                  { className: 'wl-actions', onClick: e => e.stopPropagation() },
                  h(Btn, { id: 'retry', icon: 'retry', kind: 'primary', label: t('wingline.act.retry'), onClick: () => onAction('retry', task) }),
                  h(Btn, { id: 'details', icon: 'info', label: t('wingline.act.details'), onClick: () => onSelect(task.id) }),
                  h(Btn, { id: 'log', icon: 'log', label: t('wingline.act.log'), onClick: () => onAction('log', task) }),
                  h(Btn, { id: 'chat', icon: 'chat', label: t('wingline.act.chat'), onClick: () => onAction('chat', task) }),
                  h(Btn, { id: 'archive', icon: 'archive', kind: 'ghost', label: t('wingline.act.archive'), onClick: () => onAction('archive', task) })
                )
              )
            )
          })
        )
      : h('p', { className: 'wl-slim' }, h(Icon, { name: 'info' }), t('wingline.needs.none'))
  )
}

function WorkingNow({ list, tasks, selId, onSelect, now, t }) {
  if (!list.length) {
    const ends = tasks.flatMap(x => runsOf(x).map(r => r.ended_at)).filter(isNum)
    return h(
      'section',
      { className: 'wl-sec is-idle', 'aria-labelledby': 'wl-work-h', 'data-idle': '1' },
      h(
        'p',
        { className: 'wl-slim' },
        h(Icon, { name: 'moon' }),
        h('b', { id: 'wl-work-h' }, t('wingline.working.title')),
        h('span', null, t('wingline.working.none'), ' ', ends.length ? t('wingline.working.lastStop', fmtWhen(Math.max(...ends))) : t('wingline.working.nothingYet'))
      )
    )
  }
  return h(
    'section',
    { className: 'wl-sec', 'aria-labelledby': 'wl-work-h' },
    h('h2', { className: 'wl-h2', id: 'wl-work-h' }, t('wingline.working.title')),
    h(
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
          h('div', { className: 'wl-wact' }, act ? `${act.text}${isNum(act.at) ? ` · ${t('wingline.working.ago', fmtDur(t, Math.max(0, now - act.at)))}` : ''}` : t('wingline.working.noActivity')),
          limit ? h('div', { className: 'wl-bar' }, h('i', { style: { width: `${Math.min(100, (elapsed / limit) * 100)}%` } })) : null
        )
      })
    )
  )
}

function Pipeline({ groups, selId, onSelect, now, t }) {
  const lays = useMemo(() => groups.map(g => ({ g, lay: groupLayout(g) })), [groups])
  return h(
    'section',
    { className: 'wl-sec', 'aria-labelledby': 'wl-pipe-h' },
    h('h2', { className: 'wl-h2', id: 'wl-pipe-h' }, t('wingline.pipe.title'), h('small', null, t('wingline.pipe.sub'))),
    h(
      'div',
      { className: 'wl-pipes' },
      lays.map(({ g, lay }) =>
        h(
          'figure',
          { key: `${g.kind}-${g.tasks[0].id}`, className: 'wl-pipe', 'data-group': g.name, 'data-kind': g.kind },
          h(
            'figcaption',
            null,
            h('b', null, g.name),
            h('span', null, t('wingline.tl.group', g.tasks.length, fmtDur(t, g.tasks.reduce((s, x) => s + workSeconds(x, now), 0)), money(g.tasks.reduce((s, x) => s + (x.cost?.usd || 0), 0))))
          ),
          h(
            'svg',
            { width: lay.width, height: lay.height, viewBox: `0 0 ${lay.width} ${lay.height}`, role: 'group', 'aria-label': g.name },
            h('defs', null, h('marker', { id: `wl-ar-${g.tasks[0].id}`, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, h('path', { d: 'M0,1L9,5L0,9z', className: 'wl-arrow' }))),
            lay.edges.map(e => {
              const x1 = e.a.x + NODE.w
              const y1 = e.a.y + NODE.h / 2
              const x2 = e.b.x - 3
              const y2 = e.b.y + NODE.h / 2
              const mx = (x1 + x2) / 2
              return h('path', { key: e.key, className: `wl-edge is-${e.kind}`, 'data-edge': e.kind, d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, markerEnd: `url(#wl-ar-${g.tasks[0].id})` })
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
                h('rect', { className: 'wl-card', width: NODE.w, height: NODE.h, rx: 9 }),
                h('rect', { x: 10, y: 12, width: 8, height: 8, rx: 2, style: { fill: ROLE_TONE[roleOf(task)] } }),
                h('circle', { cx: NODE.w - 12, cy: 16, r: 4, style: { fill: tone } }),
                h(
                  'foreignObject',
                  { x: 0, y: 0, width: NODE.w - 20, height: NODE.h },
                  h('div', { className: 'wl-nt' }, h('b', null, n.label), h('span', null, `${fmtDur(t, workSeconds(task, now))} · ${money(task.cost?.usd)}${r ? ` · ${t(`wingline.run.${runKind(r)}`)}` : ''}`))
                )
              )
            })
          )
        )
      )
    ),
    h('p', { className: 'wl-key' }, h('span', null, h('i', { className: 'is-dep' }), t('wingline.pipe.dep')), h('span', null, h('i', { className: 'is-seq' }), t('wingline.pipe.seq')))
  )
}

const TICKS = 5

function Timeline({ groups, axis, selId, onSelect, filter, now, t }) {
  const pct = x => (axis.toC(x) / axis.span) * 100
  const allowed = filter ? FILTERS[filter] : null
  const ticks = Array.from({ length: TICKS }, (_, k) => (k + 0.5) * (100 / TICKS))
  return h(
    'section',
    { className: 'wl-sec', 'aria-labelledby': 'wl-tl-h' },
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
          ticks.map(p => h('span', { key: p, 'data-tick': p, style: { left: `${p}%` } }, fmtWhen(axis.toR((axis.span * p) / 100))))
        ),
        h('span', { className: 'wl-tl-cost' }, t('wingline.tl.spent'))
      ),
      h(
        'div',
        { className: 'wl-tl-body' },
        groups.map(g =>
          h(
            'div',
            { key: `g-${g.kind}-${g.tasks[0].id}`, className: 'wl-tl-groupbox', 'data-group': g.name },
            h(
              'div',
              { className: 'wl-tl-group' },
              h('span', null, g.name),
              h('em', null, t('wingline.tl.group', g.tasks.length, fmtDur(t, g.tasks.reduce((s, x) => s + workSeconds(x, now), 0)), money(g.tasks.reduce((s, x) => s + (x.cost?.usd || 0), 0))))
            ),
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
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect(task.id)
                    }
                  }
                },
                h('div', { className: 'wl-tl-name' }, h('span', { className: 'wl-role', style: { background: ROLE_TONE[roleOf(task)] } }), h('span', null, shortTitle(task, g.other ? '' : g.name))),
                h(
                  'div',
                  { className: 'wl-track' },
                  ticks.map(p => h('i', { key: p, className: 'wl-gridline', style: { left: `${p}%` } })),
                  runsOf(task).map((r, i) => {
                    const a = pct(r.started_at)
                    const b = pct(runEnd(r, now))
                    return h('div', {
                      key: `${task.id}-${r.id ?? i}`,
                      className: `wl-run wl-k-${runKind(r)}`,
                      'data-kind': runKind(r),
                      title: `${t(`wingline.run.${runKind(r)}`)} · ${fmtDur(t, runEnd(r, now) - r.started_at)}`,
                      style: { left: `${a}%`, width: `${Math.max(0, b - a)}%` }
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
        h('span', { className: 'wl-roles' }, ROLES.map(r => h('span', { key: r }, h('span', { className: 'wl-role', style: { background: ROLE_TONE[r] } }), t(`wingline.role.${r}`))))
      )
    )
  )
}

function attemptNote(r, took, t) {
  const kind = runKind(r)
  if (kind !== 'stopped') return ''
  const lim = isNum(r.max_runtime_seconds) && r.max_runtime_seconds > 0 ? r.max_runtime_seconds : null
  if (r.outcome === 'timed_out') return t('wingline.run.limitHit', fmtDur(t, lim || took))
  if (lim && took > lim) return t('wingline.run.pastLimit', fmtDur(t, lim), r.outcome || r.status || '?')
  return ''
}

function Sheet({ task, byId, now, t, onAction, log, note, setNote, onClose, showReason, place }) {
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
    { className: 'wl-sheet', role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'wl-sheet-h', 'data-id': task.id, style: place || undefined },
    h(
      'div',
      { className: 'wl-sheet-head' },
      h(
        'div',
        { className: 'wl-sheet-top' },
        h('span', { className: 'wl-role', style: { background: ROLE_TONE[role] } }),
        h('span', null, t(`wingline.role.${role}`)),
        h('span', { className: 'wl-mono' }, task.id),
        h('button', { type: 'button', className: 'wl-x', 'aria-label': t('wingline.dr.close'), 'data-act': 'close-sheet', onClick: onClose }, h(Icon, { name: 'close', size: 14 }))
      ),
      h('h3', { id: 'wl-sheet-h' }, task.title),
      h(StatusPill, { task, t })
    ),
    h(
      'div',
      { className: 'wl-sheet-body' },
      showReason && blocked ? h('p', { className: 'wl-sheet-why', 'data-reason': '1' }, reasonOf(task, t)) : null,
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
      h('h4', { className: 'wl-h4' }, t('wingline.dr.attempts')),
      runs.length
        ? h(
            'ol',
            { className: 'wl-attempts' },
            runs.map((r, i) => {
              const kind = runKind(r)
              const took = runEnd(r, now) - r.started_at
              const extra = attemptNote(r, took, t)
              return h(
                'li',
                { key: r.id ?? i, className: `is-${kind}`, 'data-attempt': i + 1 },
                h('i', null),
                h('div', { className: 'wl-att-line' }, h('b', null, t('wingline.run.attempt', i + 1)), h('span', null, fmtWhen(r.started_at))),
                h('div', { className: 'wl-att-out' }, h('span', { 'data-outcome': '1' }, r.outcome || r.status || t(`wingline.run.${kind}`)), h('span', null, fmtDur(t, took))),
                extra ? h('small', null, extra) : null,
                h(RawError, { text: r.error_plain || '', t })
              )
            })
          )
        : h('p', { className: 'wl-muted' }, t('wingline.dr.noRuns')),
      logHere
        ? h(
            'div',
            { className: 'wl-log' },
            h('div', { className: 'wl-log-head' }, h(Icon, { name: 'log' }), t('wingline.dr.log'), h(Btn, { id: 'log-close', kind: 'ghost', label: t('wingline.dr.logClose'), onClick: () => onAction('log-close', task) })),
            logHere.loading
              ? h('p', { className: 'wl-muted' }, t('wingline.dr.logLoading'))
              : logHere.error
                ? h('p', { className: 'wl-muted', role: 'alert' }, t('wingline.dr.logFailed', logHere.error))
                : !logHere.exists
                  ? h('p', { className: 'wl-muted' }, t('wingline.dr.logNone'))
                  : h('div', null, logHere.truncated ? h('p', { className: 'wl-muted' }, t('wingline.dr.logTrunc')) : null, h('pre', { className: 'wl-logpre wl-mono' }, logHere.content || t('wingline.dr.logEmpty')))
          )
        : null,
      h(
        'div',
        { className: 'wl-note' },
        h('h4', { className: 'wl-h4' }, t('wingline.dr.note')),
        h('textarea', {
          className: 'wl-input',
          placeholder: t('wingline.dr.notePh'),
          'aria-label': t('wingline.dr.note'),
          value: note,
          onChange: e => setNote(e.target.value)
        }),
        h(Btn, { id: 'note', icon: 'note', label: t('wingline.act.note'), disabled: !note.trim(), onClick: () => onAction('note', task) })
      )
    ),
    h(
      'div',
      { className: 'wl-sheet-foot' },
      blocked ? h(Btn, { id: 'retry', icon: 'retry', kind: 'primary', label: t('wingline.act.retry'), onClick: () => onAction('retry', task) }) : null,
      h(Btn, { id: 'log', icon: 'log', label: t('wingline.act.log'), onClick: () => onAction('log', task) }),
      h(Btn, { id: 'kanban', icon: 'board', label: t('wingline.act.kanban'), onClick: () => onAction('kanban', task) }),
      h(Btn, { id: 'chat', icon: 'chat', label: t('wingline.act.chat'), onClick: () => onAction('chat', task) }),
      task.status !== 'archived' ? h(Btn, { id: 'archive', icon: 'archive', kind: 'ghost', label: t('wingline.act.archive'), onClick: () => onAction('archive', task) }) : null
    )
  )
}

function Lamp({ x, y, st }) {
  const r = st === 'crash' ? 6.5 : st === 'pause' ? 6 : 5
  return h('g', { className: `wlf-lamp is-${st}` }, h('circle', { className: 'wlf-lamp-c', cx: x, cy: y, r }), h('circle', { cx: x - r * 0.3, cy: y - r * 0.3, r: r * 0.35, fill: INK.lampHi }))
}

function bottomBand(x, y, w, hh, r, band) {
  const dx = r - Math.sqrt(Math.max(0, r * r - (r - band) * (r - band)))
  return `M${x + dx},${y + hh - band} H${x + w - dx} A${r},${r} 0 0 1 ${x + w - r},${y + hh} H${x + r} A${r},${r} 0 0 1 ${x + dx},${y + hh - band} Z`
}

function Block({ x, y, w, h: hh, r = 10, role }) {
  return h(
    'g',
    null,
    h('rect', { x, y, width: w, height: hh, rx: r, fill: 'url(#wlf-block)', filter: 'url(#wlf-f-block)' }),
    h('path', { d: bottomBand(x, y, w, hh, r, 4), fill: RC[role], opacity: 0.85 })
  )
}

function Hazard({ x, y, w, h: hh, r }) {
  return h('rect', { className: 'wlf-hazard', x, y, width: w, height: hh, rx: r, fill: 'url(#wlf-hz)' })
}

function MachineArt({ m, st, gateIn }) {
  const { x, y } = m
  const jam = st === 'crash' || st === 'pause'
  const motion = st === 'work' ? ' is-work' : jam ? ' is-jam' : ''
  if (m.kind === 'press') {
    return h(
      'g',
      null,
      h(Block, { x: x - 50, y: y - 62, w: 100, h: 34, role: m.role }),
      h(Block, { x: x - 50, y: y + 28, w: 100, h: 34, role: m.role }),
      jam ? h(Hazard, { x: x - 46, y: y + 48, w: 92, h: 10, r: 4 }) : null,
      h('rect', { x: x - 27.6, y: y - 20, width: 55.2, height: 42, rx: 8, fill: INK.plate }),
      h(
        'g',
        { className: `wlf-press${motion}` },
        [-18, 18].map(dx => h('line', { key: dx, x1: x + dx, y1: y - 66, x2: x + dx, y2: y - 48, stroke: INK.rod, strokeWidth: 5, strokeLinecap: 'round' })),
        h('rect', { x: x - 30, y: y - 50, width: 60, height: 46, rx: 9, fill: `url(#wlf-head-${m.role})`, filter: 'url(#wlf-f-head)' }),
        h('path', { d: `M${x - 30},${y - 42} V${y - 41} A9,9 0 0 1 ${x - 21},${y - 50} H${x + 21} A9,9 0 0 1 ${x + 30},${y - 41} V${y - 42} Z`, fill: INK.shine }),
        h('rect', { x: x - 14, y: y - 34, width: 28, height: 14, rx: 4, fill: INK.inset })
      ),
      h('rect', { x: x - 40, y: y - 66, width: 80, height: 26, rx: 8, fill: INK.housing }),
      [0, 1, 2, 3, 4].map(k => h('rect', { key: k, x: x - 30 + k * 10, y: y - 60, width: 5, height: 14, fill: INK.vent })),
      h(Lamp, { x: x + 30, y: y - 53, st })
    )
  }
  if (m.kind === 'scan') {
    return h(
      'g',
      null,
      h(Block, { x: x - 30, y: y - 42, w: 60, h: 20, r: 8, role: m.role }),
      h(Block, { x: x - 30, y: y + 22, w: 60, h: 20, r: 8, role: m.role }),
      jam ? h(Hazard, { x: x - 28, y: y + 34, w: 56, h: 7, r: 3 }) : null,
      h('rect', { x: x - 26, y: y - 30, width: 52, height: 60, rx: 10, fill: st === 'work' ? INK.glassOn : INK.glass, stroke: INK.glassLine, strokeWidth: 2 }),
      st === 'work' ? h('rect', { className: 'wlf-beam', x: x - 21.5, y: y - 28, width: 3, height: 56, fill: INK.beam }) : null,
      h('rect', { x: x - 34, y: y - 50, width: 68, height: 20, rx: 7, fill: INK.housing }),
      h('text', { className: 'wlf-num', x: x - 21, y: y - 39.5, fill: INK.scanNum, textAnchor: 'middle', dominantBaseline: 'central' }, String(m.n)),
      h(Lamp, { x: x + 24, y: y - 40, st })
    )
  }
  if (m.kind === 'gate') {
    const lamps = gateIn ? gateIn.done.slice(0, 5) : []
    return h(
      'g',
      null,
      h(Block, { x: x - 60, y: y - 66, w: 120, h: 40, r: 12, role: m.role }),
      h(Block, { x: x - 60, y: y + 26, w: 120, h: 40, r: 12, role: m.role }),
      lamps.map((done, i) => h('circle', { key: i, className: done ? 'wlf-in is-on' : 'wlf-in', cx: x - (lamps.length - 1) * 12 + i * 24, cy: y + 38, r: 6, fill: done ? INK.lampWork : INK.lampOff })),
      gateIn ? h('text', { className: 'wlf-note', x, y: y + 58, textAnchor: 'middle', dominantBaseline: 'central', fill: INK.mute }, gateIn.label) : null,
      jam ? h(Hazard, { x: x - 56, y: y - 40, w: 112, h: 8, r: 4 }) : null,
      h('ellipse', { cx: x, cy: y + 2, rx: 24.8, ry: 18.1, fill: INK.plate }),
      h('rect', { className: `wlf-arm${motion}`, x: x - 3.5, y: y - 50, width: 7, height: 24, rx: 3.5, fill: INK.rod }),
      h(
        'g',
        { className: `wlf-stamp${motion}` },
        h('circle', { cx: x, cy: y - 36, r: 26, fill: 'url(#wlf-disc)', filter: 'url(#wlf-f-head)' }),
        h('circle', { cx: x, cy: y - 36, r: 15, fill: 'none', stroke: INK.ring, strokeWidth: 3 })
      ),
      h(Lamp, { x: x + 46, y: y - 56, st })
    )
  }
  const gx = x + 8 + 9 * Math.cos(1.1 * Math.PI)
  const gy = y - 16 + 9 * Math.sin(1.1 * Math.PI)
  const ex = x + 8 + 9 * Math.cos(1.6 * Math.PI)
  const ey = y - 16 + 9 * Math.sin(1.6 * Math.PI)
  const lv = y + 6
  const wave = Array.from({ length: 9 }, (_, k) => `L${x - 14 + k * 8},${lv + Math.sin(k) * 2}`).join(' ')
  return h(
    'g',
    null,
    h('rect', { x: x - 66, y: y - 48, width: 132, height: 96, rx: 22, fill: 'url(#wlf-lab)', filter: 'url(#wlf-f-block)' }),
    h('path', { d: bottomBand(x - 66, y - 48, 132, 96, 22, 8), fill: RC[m.role] }),
    jam ? h(Hazard, { x: x - 60, y: y + 28, w: 120, h: 10, r: 4 }) : null,
    h(
      'g',
      { clipPath: 'url(#wlf-dome)' },
      h('rect', { x: x - 20, y: y - 40, width: 80, height: 80, fill: INK.dome }),
      h('path', { d: `M${x - 14},${lv} ${wave} L${x + 50},${y + 30} L${x - 14},${y + 30} Z`, fill: st === 'work' ? INK.liquidOn : INK.liquid })
    ),
    h('circle', { cx: x + 18, cy: y - 6, r: 30, fill: 'none', stroke: INK.domeLine, strokeWidth: 3 }),
    h('path', { d: `M${gx},${gy} A9,9 0 0 1 ${ex},${ey}`, fill: 'none', stroke: INK.glint, strokeWidth: 3 }),
    h(
      'g',
      { className: `wlf-glass${motion}` },
      h('circle', { cx: x - 34, cy: y - 18, r: 9, fill: 'none', stroke: INK.housing, strokeWidth: 4 }),
      h('line', { x1: x - 28, y1: y - 12, x2: x - 20, y2: y - 4, stroke: INK.housing, strokeWidth: 4, strokeLinecap: 'round' })
    ),
    h(Lamp, { x: x + 52, y: y - 34, st })
  )
}

function Crate({ task, x, y, sel, alert, scrap, waits, onSelect, label }) {
  const open = () => onSelect(task.id)
  return h(
    'g',
    {
      className: `wlf-pkg${scrap ? ' is-scrap' : ''}`,
      style: { transform: `translate(${x}px,${y}px)` },
      role: 'button',
      tabIndex: 0,
      'aria-label': label,
      'data-pkg': '1',
      'data-id': task.id,
      onClick: open,
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }
    },
    h('rect', { x: -21, y: -21, width: 42, height: 42, fill: 'transparent' }),
    h('ellipse', { cx: 2, cy: 12, rx: 16, ry: 5.5, fill: INK.crateShadow }),
    h('rect', { x: -15, y: -13.5, width: 30, height: 14, rx: 4, fill: scrap ? INK.scrapLid : INK.crateLid }),
    h('rect', { x: -15, y: -4.5, width: 30, height: 18, rx: 4, fill: scrap ? 'url(#wlf-scrapc)' : 'url(#wlf-crate)' }),
    h('rect', { x: -12, y: -4, width: 24, height: 1, fill: INK.crateHi }),
    h('rect', { x: -3, y: -13.5, width: 6, height: 9, fill: scrap ? INK.scrapTape : INK.tape }),
    h('rect', { x: -3, y: -4.5, width: 6, height: 6, fill: INK.shade }),
    h('rect', { x: -11, y: 0.5, width: 9, height: 8, rx: 2, fill: scrap ? INK.scrapTag : RC[roleOf(task)] }),
    alert
      ? h(
          'g',
          { className: 'wlf-bang', 'data-alert': alert },
          h('rect', { x: 1, y: -0.5, width: 11, height: 10, rx: 2, fill: alert === 'crash' ? INK.red : INK.amber }),
          h('rect', { x: 5.8, y: 1.2, width: 1.4, height: 4.6, fill: INK.white }),
          h('rect', { x: 5.8, y: 6.6, width: 1.4, height: 1.4, fill: INK.white })
        )
      : null,
    waits
      ? h(
          'g',
          { 'aria-hidden': 'true' },
          h('circle', { cx: 14, cy: -16, r: 8, fill: INK.ink }),
          h('path', { d: 'M11.4,-17.5 A2.6,2.6 0 0 1 16.6,-17.5', fill: 'none', stroke: INK.white, strokeWidth: 1.6 }),
          h('rect', { x: 10.5, y: -17, width: 7, height: 5, fill: INK.white })
        )
      : null,
    h('rect', { className: 'wlf-pkg-focus', x: -20, y: -18.5, width: 40, height: 37, rx: 8 }),
    sel ? h('rect', { className: 'wlf-pkg-sel', x: -20, y: -18.5, width: 40, height: 37, rx: 8, fill: 'none', stroke: INK.ink, strokeWidth: 2 }) : null
  )
}

function Tag({ x, y, w = 260, text, tone, kind, anchor = 'middle' }) {
  const left = anchor === 'start' ? x : x - w / 2
  return h(
    'foreignObject',
    { className: 'wlf-fo', x: left, y: y - 16, width: w, height: 32 },
    h('div', { className: `wlf-tag${kind ? ` is-${kind}` : ''}${anchor === 'start' ? ' is-start' : ''}` }, h('span', null, tone ? h('i', { style: { background: tone } }) : null, h('em', null, text)))
  )
}

function SceneDefs() {
  const shadow = (id, dy, sd, op) =>
    h('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '180%' }, h('feDropShadow', { dx: 0, dy, stdDeviation: sd, floodColor: INK.shadow, floodOpacity: op }))
  const lin = (id, a, b) => h('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, h('stop', { offset: 0, stopColor: a }), h('stop', { offset: 1, stopColor: b }))
  const F = SCENE
  return h(
    'defs',
    null,
    lin('wlf-floor', INK.floor0, INK.floor1),
    lin('wlf-block', INK.block0, INK.block1),
    lin('wlf-lab', INK.block0, INK.lab1),
    lin('wlf-crate', INK.crate0, INK.crate1),
    lin('wlf-scrapc', INK.scrap0, INK.scrap1),
    ROLES.map(r => h('linearGradient', { key: r, id: `wlf-head-${r}`, x1: 0, y1: 0, x2: 0, y2: 1 }, h('stop', { offset: 0, stopColor: RC_LIGHT[r] }), h('stop', { offset: 1, stopColor: RC[r] }))),
    h('radialGradient', { id: 'wlf-disc', cx: 0.35, cy: 0.3, r: 0.75 }, h('stop', { offset: 0, stopColor: INK.disc0 }), h('stop', { offset: 1, stopColor: RC.gate })),
    shadow('wlf-f-floor', 18, 20, 0.28),
    shadow('wlf-f-belt', 4, 4, 0.25),
    shadow('wlf-f-block', 5, 5, 0.25),
    shadow('wlf-f-zone', 4, 5, 0.18),
    shadow('wlf-f-head', 6, 5, 0.3),
    h(
      'pattern',
      { id: 'wlf-hz', width: 14, height: 14, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' },
      h('rect', { width: 7, height: 14, fill: INK.yellow }),
      h('rect', { x: 7, width: 7, height: 14, fill: INK.redBed })
    ),
    h('clipPath', { id: 'wlf-floorclip' }, h('rect', { x: F.x + 12, y: F.y + 12, width: F.w - 24, height: F.h - 26, rx: 28 })),
    h('clipPath', { id: 'wlf-dome' }, h('circle', { cx: 496, cy: 764, r: 30 })),
    h('clipPath', { id: 'wlf-dockclip' }, h('rect', { x: ZONE.dock.x, y: ZONE.dock.y, width: ZONE.dock.w, height: ZONE.dock.h, rx: 18 }))
  )
}

function SceneFloor({ t }) {
  const I = ZONE.intake
  const D = ZONE.dock
  const S = ZONE.scrap
  const F = { x: SCENE.x + 12, y: SCENE.y + 12, w: SCENE.w - 24, h: SCENE.h - 26 }
  const xs = []
  for (let x = F.x + 40; x < F.x + F.w; x += 40) xs.push(x)
  const ys = []
  for (let y = F.y + 40; y < F.y + F.h; y += 40) ys.push(y)
  const label = (text, x, y, key, fill = INK.label) => h('text', { key, className: 'wlf-zone-l', x, y, fill }, text)
  return h(
    'g',
    { 'aria-hidden': 'true' },
    h('rect', { x: F.x, y: F.y, width: F.w, height: F.h, rx: 28, fill: 'url(#wlf-floor)', filter: 'url(#wlf-f-floor)' }),
    h(
      'g',
      { clipPath: 'url(#wlf-floorclip)', stroke: INK.grid, strokeWidth: 1 },
      xs.map(x => h('line', { key: `x${x}`, x1: x, y1: F.y, x2: x, y2: F.y + F.h })),
      ys.map(y => h('line', { key: `y${y}`, x1: F.x, y1: y, x2: F.x + F.w, y2: y }))
    ),
    h('rect', { x: I.x, y: I.y, width: I.w, height: I.h, rx: 18, fill: INK.intake, stroke: INK.intakeLine, strokeWidth: 2, strokeDasharray: '6 6' }),
    h('rect', { x: 26, y: 380, width: 18, height: 140, rx: 6, fill: INK.door }),
    Array.from({ length: 17 }, (_, i) => h('rect', { key: `d${i}`, x: 28, y: 386 + i * 8, width: 14, height: 2, fill: INK.doorSlat })),
    h('rect', { x: D.x, y: D.y, width: D.w, height: D.h, rx: 18, fill: INK.dock, filter: 'url(#wlf-f-zone)' }),
    h(
      'g',
      { clipPath: 'url(#wlf-dockclip)' },
      Array.from({ length: Math.floor((D.h - 60) / 23) + 1 }, (_, i) => h('rect', { key: `p${i}`, x: D.x, y: D.y + 60 + i * 23, width: D.w, height: 1.5, fill: INK.plank }))
    ),
    h('rect', { x: S.x, y: S.y, width: S.w, height: S.h, rx: 16, fill: INK.scrap, stroke: INK.scrapLine, strokeWidth: 2, strokeDasharray: '4 6' }),
    h(
      'g',
      { filter: 'url(#wlf-f-belt)' },
      BELTS.map((b, i) => h('polyline', { key: `bd${i}`, className: 'wlf-bed', points: ptsAttr(b), fill: 'none', stroke: INK.bed, strokeWidth: 30, strokeLinejoin: 'round' })),
      h('polyline', { className: 'wlf-redbed', points: ptsAttr(RED_BELT), fill: 'none', stroke: INK.redBed, strokeWidth: 30 })
    ),
    BELTS.map((b, i) => h('polyline', { key: `bi${i}`, points: ptsAttr(b), fill: 'none', stroke: INK.bedIn, strokeWidth: 22, strokeLinejoin: 'round' })),
    BELTS.map((b, i) => h('polyline', { key: `bs${i}`, className: 'wlf-slats', points: ptsAttr(b), fill: 'none', stroke: INK.slat, strokeWidth: 22, strokeLinejoin: 'round', strokeDasharray: '3 8' })),
    h('polyline', { points: ptsAttr(RED_BELT), fill: 'none', stroke: INK.yellow, strokeWidth: 22 }),
    h('polyline', { className: 'wlf-redslats', points: ptsAttr(RED_BELT), fill: 'none', stroke: INK.redBed, strokeWidth: 22, strokeDasharray: '2 16', opacity: 0.35 }),
    CABLES.map((d, i) =>
      h('g', { key: `cb${i}`, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }, h('path', { d, stroke: INK.cable, strokeWidth: 5 }), h('path', { d, stroke: INK.cableIn, strokeWidth: 2 }))
    ),
    label(t('wingline.fx.zone.intake'), I.x + 14, I.y + 28, 'li'),
    label(t('wingline.fx.zone.build'), 308, 190, 'lb'),
    label(t('wingline.fx.zone.review'), 690, 236, 'lr'),
    label(t('wingline.fx.zone.merge'), 1012, 266, 'lm'),
    label(t('wingline.fx.zone.shipped'), D.x + 16, D.y + 28, 'ls'),
    label(t('wingline.fx.zone.archived'), S.x + 14, S.y + 26, 'la')
  )
}

function Factory({ tasks, now, axis, selId, onSelect, onNotice, t }) {
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
  const groups = useMemo(() => groupsOf(tasks, t), [tasks, t])
  const prefixOf = useMemo(() => {
    const out = new Map()
    for (const g of groups) for (const x of g.tasks) out.set(x.id, g.other ? '' : g.name)
    return out
  }, [groups])
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
        return ps.length ? { done, label: t('wingline.fx.inputs', done.filter(Boolean).length, ps.length) } : null
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
      waits: zone === 'intake' && (task.parents || []).some(q => lay.zoneOf[q] && lay.zoneOf[q] !== 'dock'),
      onSelect,
      label: t('wingline.fx.pkg', task.title, whereOf(task))
    })
  }
  const first = lay.zones.bay[0]
  const firstPos = first ? lay.pos[first.id] : null
  const callout =
    first && firstPos
      ? (() => {
          const kind = lay.kinds[first.id]
          const r = runsOf(first).filter(x => isNum(x.ended_at) && (T == null || x.ended_at <= T)).pop()
          const kick = kind === 'pause' ? t('wingline.fx.callPause') : r && r.outcome === 'timed_out' ? t('wingline.fx.callLimit') : r && r.outcome === 'crashed' ? t('wingline.fx.callCrash') : t('wingline.fx.callStop')
          const cx = firstPos[0] + 40 + (Math.min(nBay, CAP.bay) - 1) * 76
          const w = Math.max(200, Math.min(SCENE.x + SCENE.w - 20 - cx, 350))
          const cy = firstPos[1] - 62
          return h(
            'g',
            { key: 'callout' },
            h('path', { d: `M${cx + 1},${cy + 50} L${cx - 10},${cy + 58} L${cx + 1},${cy + 66} Z`, fill: INK.card }),
            h(
              'foreignObject',
              { className: 'wlf-fo', x: cx, y: cy, width: w, height: 120 },
              h(
                'div',
                {
                  className: `wlf-call${kind === 'pause' ? ' is-pause' : ''}`,
                  role: 'button',
                  tabIndex: 0,
                  'data-callout': first.id,
                  onClick: () => onSelect(first.id),
                  onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect(first.id)
                    }
                  }
                },
                h('small', null, kick),
                h('b', null, first.title),
                h('span', null, t('wingline.fx.callMeta', fmtDur(t, workSeconds(first, T ?? now)), runsOf(first).length, money(first.cost?.usd))),
                h('em', null, t('wingline.fx.decide'))
              )
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
  const moving = live ? working > 0 : playing
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
        h('b', null, live ? t('wingline.fx.live') : playing ? t('wingline.fx.replay', speed) : t('wingline.fx.paused')),
        h('span', null, live ? (working ? t('wingline.fx.running', working) : t('wingline.fx.idle')) : working ? t('wingline.fx.working', working) : t('wingline.fx.idle'))
      ),
      h('div', { className: 'wl-clock' }, h('small', null, day), h('b', null, time))
    ),
    h(
      'div',
      { className: 'wlf-stage' },
      h(
        'svg',
        {
          className: 'wlf-svg',
          viewBox: `${SCENE.x} ${SCENE.y} ${SCENE.w} ${SCENE.h}`,
          preserveAspectRatio: 'xMidYMid meet',
          role: 'group',
          'aria-label': t('wingline.fx.aria'),
          'data-moving': moving ? '1' : '0',
          'data-jam': nBay ? '1' : '0'
        },
        h(SceneDefs, null),
        h(SceneFloor, { t }),
        h(
          'g',
          { 'data-bay': nBay },
          h('rect', { className: `wlf-bin${nBay ? ' is-on' : ''}`, x: B.x, y: B.y, width: B.w, height: B.h, rx: 20, fill: nBay ? INK.binOn : INK.bin, filter: 'url(#wlf-f-zone)' }),
          h('rect', { className: 'wlf-binline', x: B.x + 7, y: B.y + 7, width: B.w - 14, height: B.h - 14, rx: 15, fill: 'none', stroke: INK.binLine, strokeWidth: 2.5, strokeDasharray: '10 8', opacity: nBay ? 0.8 : 0.3 }),
          h('rect', { x: B.x + 22, y: B.y + 20, width: nBay ? 184 : 162, height: 34, rx: 17, fill: nBay ? INK.red : INK.binOff }),
          h('text', { className: 'wlf-binhead', x: B.x + 38, y: B.y + 37, dominantBaseline: 'central', fill: INK.white }, t('wingline.fx.bin', nBay)),
          nBay ? null : h('text', { className: 'wlf-note', x: B.x + 26, y: B.y + 100, dominantBaseline: 'central', fill: INK.label }, t('wingline.fx.clear')),
          lay.zones.bay.slice(0, CAP.bay).map(task => {
            const p = lay.pos[task.id]
            return h('g', { key: `ring-${task.id}`, 'aria-hidden': 'true' }, h('circle', { cx: p[0], cy: p[1] + 2, r: 25, fill: INK.halo }), h('circle', { className: 'wlf-ring', cx: p[0], cy: p[1] + 2, r: 25, fill: 'none', stroke: INK.ringRed, strokeWidth: 2 }))
          })
        ),
        lay.zones.intake.length ? null : h('text', { className: 'wlf-note', x: I.x + I.w / 2, y: I.y + I.h / 2, textAnchor: 'middle', fill: INK.label }, t('wingline.fx.queueEmpty')),
        lay.zones.scrap.length ? null : h('text', { className: 'wlf-note', x: S.x + S.w / 2, y: S.y + 84, textAnchor: 'middle', fill: INK.label }, t('wingline.fx.none')),
        h(
          'g',
          { 'data-shipped': lay.zones.dock.length },
          h('rect', { x: D.x + 12, y: D.y + 44, width: D.w - 24, height: 66, rx: 12, fill: INK.card, filter: 'url(#wlf-f-zone)' }),
          h('text', { className: 'wlf-sign', x: D.x + 26, y: D.y + 78, dominantBaseline: 'central', fill: INK.ink }, money(shipped)),
          h('text', { className: 'wlf-note', x: D.x + D.w - 26, y: D.y + 67, textAnchor: 'end', dominantBaseline: 'central', fill: INK.mute }, t('wingline.fx.crates', lay.zones.dock.length)),
          h('text', { className: 'wlf-note', x: D.x + D.w - 26, y: D.y + 89, textAnchor: 'end', dominantBaseline: 'central', fill: INK.mute }, t('wingline.fx.shipped'))
        ),
        MACHINES.map(m => {
          const o = lay.occ[m.key]
          const st = o ? o.state : 'idle'
          const label = o ? (o.state === 'work' ? t('wingline.fx.mWork', nameOf(m), o.task.title) : t('wingline.fx.mJam', nameOf(m), o.task.title)) : t('wingline.fx.mIdle', nameOf(m))
          return h(
            'g',
            {
              key: m.key,
              className: 'wlf-m',
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
            h('rect', { className: 'wlf-m-focus', x: m.x - m.w / 2 - 8, y: m.y - m.h / 2 - 8, width: m.w + 16, height: m.h + 16, rx: 14 }),
            h(MachineArt, { m, st, gateIn: m.key === 'gate' ? gateIn : null }),
            m.kind === 'scan' ? null : h('text', { className: 'wlf-name', x: m.x, y: m.y + m.h / 2 + (m.kind === 'gate' ? 26 : 20), textAnchor: 'middle', dominantBaseline: 'central', fill: st === 'crash' ? INK.redText : INK.label }, nameOf(m).toUpperCase())
          )
        }),
        ['intake', 'bay', 'dock', 'scrap'].flatMap(z => lay.zones[z].map(task => crate(task, z))),
        lay.zones.machine.map(task => crate(task, 'machine')),
        MACHINES.filter(m => lay.occ[m.key] && lay.occ[m.key].state === 'crash').map(m =>
          h(
            'g',
            { key: `sm-${m.key}`, className: 'wlf-smoke', 'data-smoke': m.key, 'aria-hidden': 'true', fill: INK.smoke },
            h('circle', { cx: m.x - 8, cy: m.y - m.h / 2 - 4, r: 7 }),
            h('circle', { cx: m.x + 4, cy: m.y - m.h / 2 - 10, r: 6 }),
            h('circle', { cx: m.x + 14, cy: m.y - m.h / 2 - 2, r: 5 })
          )
        ),
        MACHINES.map(m => {
          const o = lay.occ[m.key]
          if (!o) return null
          const scan = m.kind === 'scan'
          const tx = scan ? m.x + 40 : m.x
          const ty = scan ? m.y - 24 : m.y - m.h / 2 - 24
          if (o.state === 'work') {
            const r = runsOf(o.task).filter(x => x.started_at <= (T ?? now)).pop()
            const label = shortTitle(o.task, prefixOf.get(o.task.id)) + (r ? ` · ${fmtDur(t, Math.max(0, (T ?? now) - r.started_at))}` : '') + (o.extra.length ? ` · ${t('wingline.fx.more', o.extra.length)}` : '')
            return h(Tag, { key: `tag-${m.key}`, x: tx, y: ty, w: scan ? 250 : 280, text: label, tone: RC[m.role], anchor: scan ? 'start' : 'middle' })
          }
          return h(Tag, { key: `tag-${m.key}`, x: tx, y: ty, w: 260, text: o.state === 'crash' ? t('wingline.fx.jam') : t('wingline.fx.pause'), kind: o.state, anchor: scan ? 'start' : 'middle' })
        }),
        ['intake', 'dock', 'scrap', 'bay'].map(z =>
          lay.overflow[z]
            ? h(
                'text',
                {
                  key: `of-${z}`,
                  className: 'wlf-note',
                  x: z === 'dock' ? D.x + D.w - 20 : z === 'bay' ? B.x + B.w - 24 : z === 'intake' ? I.x + I.w - 14 : S.x + S.w - 14,
                  y: z === 'dock' ? D.y + D.h - 16 : z === 'bay' ? B.y + 42 : z === 'intake' ? I.y + I.h - 14 : S.y + 26,
                  textAnchor: 'end',
                  fill: INK.mute
                },
                t('wingline.fx.more', lay.overflow[z])
              )
            : null
        ),
        callout
      )
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
  const [place, setPlace] = useState(null)
  const rootRef = useRef(null)
  const autoRef = useRef(false)
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
  const selected = byId.get(selId) || null
  const boardSlug = data?.board || board
  const boards = useMemo(() => (Array.isArray(data?.boards) ? data.boards.filter(b => b && typeof b.slug === 'string') : []), [data])
  useEffect(() => {
    if (!data || autoRef.current || !boards.length) return
    autoRef.current = true
    const kept = readStore(BOARD_KEY, '')
    if (kept && boards.some(b => b.slug === kept)) {
      if (kept !== data.board) setBoard(kept)
      return
    }
    if (tasks.length) return
    const best = boards.filter(b => isNum(b.tasks) && b.tasks > 0).sort((a, b) => (b.last_activity || 0) - (a.last_activity || 0))[0]
    if (best && best.slug !== data.board) {
      setData(null)
      setBoard(best.slug)
    }
  }, [data, boards, tasks.length])
  useLayoutEffect(() => {
    if (!selected) return undefined
    const measure = () => {
      let el = rootRef.current
      while (el && el.parentElement && !/auto|scroll/.test(window.getComputedStyle(el).overflowY)) el = el.parentElement
      const r = el ? el.getBoundingClientRect() : null
      if (!r || r.width < 320 || r.height < 240) {
        setPlace(null)
        return
      }
      const top = Math.max(0, r.top)
      const bottom = Math.min(window.innerHeight, r.bottom)
      setPlace({ top: `${top}px`, height: `${bottom - top}px`, right: `${Math.max(0, window.innerWidth - r.right)}px` })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [selected])
  useEffect(() => {
    if (!selected) return undefined
    const onKey = e => {
      if (e.key === 'Escape' && !dlg) setSelId(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, dlg])
  const fail = useCallback((source, err) => {
    console.warn(`[${ID}] ${source} failed`, err)
    setFailures(f => [...f.slice(-5), { id: `${Date.now()}-${f.length}`, source, message: errText(err) }])
  }, [])
  const select = useCallback(id => setSelId(id), [])
  const pickView = v => {
    setView(v)
    writeStore(VIEW_KEY, v)
  }
  const pickBoard = slug => {
    autoRef.current = true
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
  const groups = useMemo(() => groupsOf(tasks, t), [tasks, t])
  const sheet = selected
    ? h(Sheet, { task: selected, byId, now, t, onAction, log, note, setNote, place, onClose: () => setSelId(null), showReason: view === 'factory' })
    : null
  let content
  if (!data) {
    content = loadErr
      ? h('div', { className: 'wl-state', role: 'alert' }, loadErr, h(Btn, { id: 'reload', icon: 'retry', label: t('wingline.tryAgain'), onClick: () => load() }))
      : h('div', { className: 'wl-state', role: 'status' }, t('wingline.loading'))
  } else if (!tasks.length) {
    content = h('div', { className: 'wl-state' }, t('wingline.empty'))
  } else if (view === 'factory') {
    content = h(Factory, { tasks, now, axis, selId: selected?.id, onSelect: select, onNotice: setNotice, t })
  } else {
    content = h(
      'main',
      { className: 'wl-main' },
      h(NeedsYou, { list: blocked, selId: selected?.id, onSelect: select, onAction, now, t }),
      h(WorkingNow, { list: running, tasks, selId: selected?.id, onSelect: select, now, t }),
      h(Pipeline, { groups, selId: selected?.id, onSelect: select, now, t }),
      h(Timeline, { groups, axis, selId: selected?.id, onSelect: select, filter, now, t })
    )
  }
  return h(
    'div',
    { className: 'wl-root', 'data-view': view, ref: rootRef },
    h('style', null, CSS),
    h(
      'header',
      { className: 'wl-top' },
      h('div', { className: 'wl-brand' }, h('h1', null, t('wingline.title')), h('span', null, t('wingline.subtitle'))),
      h(
        'select',
        { className: 'wl-select', 'aria-label': t('wingline.boardPick'), value: boardSlug || '', onChange: e => pickBoard(e.target.value) },
        boards.length
          ? boards.map(b => h('option', { key: b.slug, value: b.slug, 'data-tasks': isNum(b.tasks) ? b.tasks : '' }, isNum(b.tasks) ? t('wingline.boardOpt', b.name || b.slug, b.tasks) : b.name || b.slug))
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
    sheet,
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
