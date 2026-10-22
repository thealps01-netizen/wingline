import { host, usePluginI18n } from '@hermes/plugin-sdk'
import { jsx, jsxs } from 'react/jsx-runtime'
import { useEffect, useRef } from 'react'

const ID = 'wingline'
const ROUTE = '/wingline'
const POLL_MS = 5000
const KANBAN = '/api/plugins/kanban'
const UNDO_MS = 8000
const LOG_TAIL = 131072
const QUIET = 900
const DONE_PAGE = 8
const UNREAD_KEY = 'seen'
const ROLEO = { builder: 0, detective: 1, review: 2, gate: 3 }
const COLS = [
  ['needs', 'var(--ui-red)'],
  ['working', 'var(--ui-yellow)'],
  ['queued', 'var(--ui-text-tertiary)'],
  ['done', 'var(--ui-text-quaternary)']
]
const HUES = ['var(--ui-blue)', 'var(--ui-cyan)', 'var(--ui-purple)', 'var(--ui-orange)', 'var(--ui-green)', 'var(--ui-warm)', 'var(--ui-accent)']
const LENSES = ['build', 'security', 'ux', 'ui', 'code', 'gate', 'flake']
const CHECKS = ['security', 'ux', 'ui', 'code']
const CAUSES = ['usage_limit', 'silent', 'time_limit', 'missing_skill', 'error', 'asks_you', 'review']
const DUR_ARGS = { rateLimited: [0], crashLimit: [0], crashError: [0], lastLife: [0, 1], limitRan: [0] }
const SVG_NS = 'http://www.w3.org/2000/svg'
const ICONS = {
  search: [['circle', { cx: 11, cy: 11, r: 7 }], ['path', { d: 'm20 20-3.5-3.5' }]],
  play: [['path', { d: 'M7 4v16l13-8z', fill: 'currentColor' }]],
  pause: [['path', { d: 'M8 5v14M16 5v14' }]],
  x: [['path', { d: 'M6 6l12 12M18 6 6 18' }]],
  chev: [['path', { d: 'm9 6 6 6-6 6' }]],
  rewind: [['path', { d: 'M3 12a9 9 0 1 0 3-6.7L3 8' }], ['path', { d: 'M3 3v5h5' }]],
  board: [['rect', { x: 3, y: 4, width: 5, height: 16, rx: 1.5 }], ['rect', { x: 10, y: 4, width: 5, height: 10, rx: 1.5 }], ['rect', { x: 17, y: 4, width: 4, height: 13, rx: 1.5 }]],
  bolt: [['path', { d: 'M13 3 5 14h6l-1 7 8-11h-6z' }]]
}
let ctxRef = null

const BUNDLES = {
  en: {
    wingline: {
      title: 'Wingline',
      nav: 'Wingline',
      loading: 'Loading your boards…',
      empty: 'No Kanban board has tasks yet.',
      tryAgain: 'Try again',
      unit: { s: n => `${n}s`, m: n => `${n}m`, hm: (h, m) => `${h}h ${m}m`, dh: (d, h) => `${d}d ${h}h` },
      ago: d => `${d} ago`,
      justNow: 'just now',
      err: {
        noRest: 'The Hermes plugin bridge (ctx.rest) is not available.',
        noBridge: 'The Hermes desktop bridge (window.hermesDesktop.api) is not available.',
        shape: 'The Wingline backend answered with an unexpected shape.',
        refused: 'Hermes did not apply the change.',
        noId: 'Hermes created no task id.'
      },
      rail: {
        search: 'Search',
        searchTitle: 'Search tasks and commands (/)',
        decisions: n => (n === 1 ? '1 decision waits for you' : `${n} decisions wait for you`),
        nothing: 'Nothing needs you',
        boards: 'Boards',
        agents: 'Live agents',
        noAgent: 'No agent is working.',
        working: 'working',
        live: when => `Live from Hermes Kanban · updated ${when}`,
        problems: n => (n === 1 ? '1 source could not be read' : `${n} sources could not be read`)
      },
      top: {
        meta: (n, usd) => `${n} tasks · ${usd}`,
        filter: 'Filter cards…',
        replaying: 'Replay',
        replay: 'Replay',
        goLive: 'Go live',
        replayTitle: 'Replay this board (R)',
        clockTitle: 'Hermes time, updated every 5 seconds'
      },
      view: { board: 'Board', list: 'List', inbox: 'Inbox' },
      col: { needs: 'Needs you', working: 'Working', queued: 'Queued', done: 'Done' },
      pill: { needs: 'Needs you', working: 'Working', queued: 'Queued', done: 'Done', absent: 'Not created yet', gone: 'Removed' },
      lens: { build: 'Build', security: 'Security check', ux: 'Usability check', ui: 'Visual check', code: 'Code check', gate: 'Your approval', flake: 'Find the flaky test' },
      lensShort: { build: 'build', security: 'security', ux: 'usability', ui: 'visual', code: 'code', gate: 'approval', flake: 'flake' },
      labelKind: { review: l => `Review: ${l}`, continued: l => `Continued: ${l}` },
      card: {
        checks: n => `${n} checks at the same time`,
        round: (n, why) => `Round ${n} · ${why}`,
        found: s => `${s} check found a problem`,
        askedChanges: 'you asked for changes',
        again: 'went round again',
        tryN: n => `try ${n}`,
        waitsFor: 'waits for ',
        waitsMany: (a, b) => `${a} of ${b} earlier steps`,
        ready: 'ready · starts when an agent is free',
        readyMany: 'ready · start together when agents are free',
        requeued: 'sent back to the queue',
        withNote: n => `with your note “${n}”`,
        usually: usd => `usually ≈ ${usd}`,
        notes: n => (n === 1 ? '1 note' : `${n} notes`),
        steps: (n, d) => `${n} steps · ${d}`,
        more: n => `Show ${n} older pipelines`,
        elapsed: d => `${d} elapsed`,
        pastLimit: (d, l) => `${d} · past its ${l} limit`,
        usualRange: (a, b) => `usually ${a}–${b}m`,
        limit: l => `limit ${l}`,
        working: 'working…',
        tidy: 'tidied up its notes to keep working'
      },
      res: {
        back: (s, n) => `Sent back: ${s} found a problem → round ${n}`,
        backYou: n => `Checks passed, you asked for changes → round ${n}`,
        merged: 'Merged into the main code',
        mergedRound: n => `Merged into the main code in round ${n}`,
        approved: 'Approved',
        all: n => `All ${n} steps finished`,
        some: (a, b) => `${a} of ${b} steps finished`,
        finished: 'Finished',
        took: d => ` in ${d}`,
        tries: n => ` · took ${n} tries`
      },
      badge: {
        usage_limit: f => (f.reset ? `Usage limit · reset ${f.reset}` : 'Usage limit'),
        silent: f => `Stuck · silent ${f.silentFor}`,
        time_limit: f => `Out of time · ${f.limit} limit`,
        missing_skill: () => 'A skill is missing',
        error: () => 'Stopped with an error',
        asks_you: () => 'Asks for your decision',
        review: () => 'Waiting for your review'
      },
      head: {
        usage_limit: f => (f.resetPassed || !f.reset ? 'The limit has reset. Run it again?' : `Wait until ${f.reset}, then run it again.`),
        silent: () => 'The agent got stuck. Still need this?',
        time_limit: () => 'It ran out of time. Give it more?',
        missing_skill: () => 'A skill it needs is missing.',
        error: () => 'The agent stopped with an error. Try again?',
        asks_you: () => 'The agent asks for your decision.',
        review: () => 'The agent finished and asks for a review.'
      },
      why: {
        usage_limit: f =>
          `It worked for ${f.worked} and then hit the model’s usage limit. Hermes tried ${f.tries === 1 ? '1 more time' : `${f.tries} more times`}${f.reset ? ` before the limit reset at ${f.reset}` : ''}, and each try failed within a minute. It will not try again on its own.`,
        silent: f => `It went silent ${f.into} in (last sign of life at ${f.lastLife}) and never came back. Hermes stopped it ${f.silentFor} later and will not try again on its own.`,
        time_limit: f => `It worked for ${f.worked}, the full ${f.limit} it was allowed, and Hermes stopped it.`,
        missing_skill: () => 'Hermes could not start it because a skill named in the task is not installed. Install the skill or remove it from the task, then run it again.',
        error: f => `Hermes allows ${f.allowed === 1 ? '1 failure' : `${f.allowed} failures`} for this task, and that is used up. The agent’s own words are in the timeline below.`,
        asks_you: () => 'It stopped and asked a question. The question is below, in its own words.',
        review: () => 'Hermes Kanban handles reviews. Open it there to approve or ask for changes.'
      },
      kids: n => (n ? (n === 1 ? '1 step after it cannot start until this one is done.' : `${n} steps after it cannot start until this one is done.`) : 'No other step waits for it.'),
      asked: q => `You asked: ${q}`,
      question: 'The agent’s question, in its own words',
      tl: {
        createdYou: 'You created this task.',
        createdTask: 'Another task created it.',
        waitFor: p => `Waiting for “${p}” to finish first.`,
        ready: 'The steps before it finished, so it was ready to start.',
        started: 'An agent started working on it.',
        restarted: n => `Hermes started it again (attempt ${n}).`,
        rateLimited: d => `After ${d} of work the model’s usage limit ran out. Hermes paused it; this does not count as a failure.`,
        quiet: 'Hermes noticed the agent had gone quiet and tried to stop it.',
        crashLimit: (d, r) => `It stopped after ${d}: the usage limit was still in place (it resets at ${r}).`,
        crashSkill: s => `It could not start: a skill it needs (“${s}”) is not installed.`,
        crashDied: 'The agent’s program had stopped, so the attempt ended.',
        crashError: d => `The agent’s program stopped with an error after ${d}.`,
        timedOut: 'It ran past its time limit, so Hermes stopped it.',
        gaveUp: n => `Hermes stopped trying: this task may fail only ${n === 1 ? '1 time' : `${n} times`}, and that is used up.`,
        asked: 'The agent stopped and asked for your decision:',
        noteYou: 'A note was added to the card.',
        noteAgent: 'The agent left a note on the card.',
        unblocked: 'It was sent back to the queue to run again.',
        finished: 'Finished.',
        removed: 'Removed from the board.',
        lastLife: (a, b) => `Last sign of life from the agent, ${a} in. After this it stayed silent for ${b}.`,
        limitRan: l => `Its time limit of ${l} ran out.`
      },
      act: {
        again: 'Run again',
        againTitle: 'Starts a new attempt from the beginning',
        more: 'Run with more time',
        moreTitle: 'Starts a copy of this task with a longer time limit',
        reply: 'Reply',
        replyTitle: 'Answer the agent; it starts again and reads your answer',
        remove: 'Remove',
        removeTitle: 'Moves it to the archive. You can undo for 8 seconds.',
        removeSure: 'Click again to remove',
        kanban: 'Open in Kanban',
        check: 'Check',
        checkTitle: 'Reads the record. Nothing is sent to the agent; it costs nothing.',
        tell: 'Tell the agent',
        tellTitle: 'Adds a note the agent reads at its next step',
        send: 'Send',
        cancel: 'Cancel',
        hintAgain: 'starts a new attempt from the beginning',
        hintMore: 'starts a copy with a longer time limit',
        hintReply: 'saves your answer on the card and starts the agent again',
        hintRemove: 'moves it to the archive · Undo for 8 seconds'
      },
      note: {
        again: 'Anything the agent should do differently? (optional)',
        reply: 'Your answer to the agent…',
        tell: 'Tell the agent… e.g. “skip the docs, focus on the tests”',
        goAgain: 'Run again',
        goReply: 'Send and continue',
        hintAgain: 'Your note is saved on the card first, then Hermes queues a new attempt.',
        hintReply: 'Your answer is saved on the card; the agent starts again and reads it.',
        hintTell: 'The agent reads it at its next step, without stopping.',
        silent: d => `The agent has been silent for ${d} and may never read this.`
      },
      check: {
        stuck: d => `No sign of life for ${d}. It is probably stuck. Wait for Hermes to stop it, or remove it.`,
        last: (a, x) => `Last move ${a}: ${x}. `,
        long: (d, m) => `Running longer than usual (${d}; this kind usually takes up to ${m} min).`,
        ok: (d, a, b) => `On track: ${d} so far; this kind usually takes ${a}–${b} min.`,
        plain: d => `${d} so far.`
      },
      toast: {
        undo: 'Undo',
        undone: 'Undone',
        again: t => `“${t}” is queued to run again.`,
        againNote: t => `“${t}” is queued to run again with your note.`,
        replied: t => `Your answer was saved and “${t}” is queued again.`,
        told: 'Sent. The agent sees it at its next step.',
        removing: t => `Removing “${t}”…`,
        removed: t => `“${t}” was moved to the archive.`,
        failed: (what, m) => `${what} failed: ${m}`,
        actAgain: 'Run again',
        actTell: 'Tell the agent',
        actRemove: 'Remove',
        actMore: 'Run with more time',
        actReply: 'Reply'
      },
      drag: {
        working: 'An agent is working on this. Wait for it to finish.',
        done: 'Only the agent marks work done. A gate finishes when you approve it.',
        start: 'Work starts by itself when an agent is free. Drop on Queued to run it again.',
        block: 'Only an agent can raise a block.',
        reopen: 'Finished work cannot reopen. Create a follow-up task instead.',
        none: 'Nothing to change there.'
      },
      det: {
        task: 'Task',
        move: 'J / K to move',
        close: 'Close (Esc)',
        step: (i, n, p) => `Step ${i} of ${n} in ${p}`,
        whyStopped: 'Why it stopped',
        live: 'Live',
        waiting: 'Waiting',
        readyWait: 'Ready. Starts when an agent is free.',
        lastUpdate: a => `last update ${a}`,
        how: 'How it went',
        report: 'Agent’s report (in its own words)',
        tech: 'Technical details',
        facts: 'Facts',
        agent: 'Agent',
        created: 'Created',
        limit: 'Time limit',
        none: 'none',
        retries: 'Retries',
        dflt: 'board default',
        cost: 'Cost',
        estimated: ' (estimated from sessions)',
        typical: r => `Typical ${r}`,
        typicalVal: (m, usd, n) => `${m} min, ${usd} (median of ${n} finished runs)`,
        noTypical: r => `no finished ${r} runs yet`,
        attempts: n => `Attempts · ${n}`,
        worked: d => `Worked for ${d}`,
        workingFor: d => `Working for ${d}`,
        noSummary: 'No summary was written.',
        stillWorking: 'The agent is still working.',
        noAttempts: 'No attempts yet.',
        id: 'Task id',
        loop: 'The loop',
        round1: 'round 1',
        rounds: n => `${n} rounds so far`,
        mergedNode: 'Merged',
        backNode: 'Sent back',
        okNode: 'Your OK',
        loopWhy: (s, x) => `${s} found a problem: ${x}`,
        loopYou: x => `Checks passed, but it needed your call on ${x}. You asked for changes`,
        loopYouPlain: 'Checks passed, but it needed your decision. You asked for changes',
        toRound: n => ` → round ${n}`
      },
      out: {
        completed: 'completed',
        crashed: 'crashed',
        timed_out: 'timed out',
        blocked: 'blocked',
        rate_limited: 'paused by the usage limit',
        gave_up: 'gave up',
        reclaimed: 'reclaimed',
        running: 'running',
        other: 'ended'
      },
      list: {
        needs: 'needs you',
        working: 'working',
        queued: 'queued',
        shipped: a => `shipped ${a}`,
        tasks: n => `${n} tasks`,
        runs: n => (n === 1 ? '1 run' : `${n} runs`),
        done: 'done',
        finished: a => `finished ${a}`
      },
      inbox: {
        needs: 'Needs you',
        since: 'Since you last looked',
        shipped: p => `${p} shipped`,
        allDone: n => `All ${n} tasks done`,
        crashed: t => `${t} crashed, retried`,
        endedAs: o => `The run ended as ${o}`,
        clear: 'All clear',
        clearSub: 'Nothing is waiting for you.'
      },
      feed: {
        started: ' started',
        finished: d => ` finished in ${d}`,
        approval: ' asks for your approval',
        blocked: ' is blocked',
        ended: (o, d) => ` ${o} after ${d}`,
        needs: 'Needs you: '
      },
      replay: {
        range24: '24 h',
        range3: '3 days',
        range7: '7 days',
        rangeAll: 'All',
        s10: '10 min/s',
        s30: '30 min/s',
        s2h: '2 h/s',
        play: 'Play / pause (Space)'
      },
      pal: {
        placeholder: 'Type a command or search tasks on every board…',
        selected: s => `Selected: ${s}`,
        tasks: 'Tasks',
        boards: 'Boards',
        commands: 'Commands',
        goBoard: 'Go to Board',
        goList: 'Go to List',
        goInbox: 'Go to Inbox',
        replay: 'Replay this board',
        live: 'Go live',
        help: 'Show keyboard shortcuts',
        rail: 'Toggle sidebar',
        open: s => `Open “${s}”`,
        again: s => `Run “${s}” again`,
        remove: s => `Remove “${s}”`,
        board: s => `Switch to ${s}`,
        catView: 'View',
        catTime: 'Time',
        catHelp: 'Help',
        catAction: 'Action',
        catBoard: 'Board'
      },
      keys: {
        title: 'Keyboard',
        search: 'Search everything',
        filter: 'Filter cards',
        move: 'Move selection',
        open: 'Open selected',
        close: 'Close / exit replay',
        again: 'Run selected again',
        undo: 'Undo',
        views: 'Board · List · Inbox',
        replay: 'Replay',
        play: 'Play / pause replay',
        rail: 'Toggle sidebar',
        help: 'This help'
      },
      log: {
        title: 'Worker log',
        open: 'Open log',
        hide: 'Hide log',
        loading: 'Reading the log…',
        none: 'No log: this task never started a worker.',
        empty: 'The log is empty.',
        trunc: 'Showing the end of the log.',
        failed: m => `The log could not be read: ${m}`
      },
      dlg: {
        cancel: 'Cancel',
        close: 'Close',
        retryTitle: 'Run with more time',
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
        state: { pending: 'Not done', running: 'Working…', done: 'Done', failed: 'Failed' },
        retryOk: id => `Done. The new task is ${id}; the old one is archived.`,
        stoppedAt: 'Stopped at the first failure. Steps marked Done already happened on the board; nothing after the failed step ran.',
        retryComment: (id, d) => `Wingline retried this task as ${id} with a time limit of ${d}; this task is archived.`
      }
    }
  }
}

const isNum = v => typeof v === 'number' && Number.isFinite(v)
const enc = encodeURIComponent
const pad = n => String(n).padStart(2, '0')
const errText = err => String(err?.message || err || '')
const usd = v => `$${isNum(v) ? (v >= 100 ? v.toFixed(0) : v.toFixed(2)) : '0.00'}`
const hm = (ts, sec) => {
  const d = new Date(ts * 1000)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}${sec ? `:${pad(d.getSeconds())}` : ''}`
}
const hue = p => {
  let x = 0
  for (const c of String(p)) x = (x * 31 + c.charCodeAt(0)) >>> 0
  return HUES[x % HUES.length]
}
const roundOf = pipe => String(pipe || '').match(/^(\S+) r(\d+)$/)
const verdictBad = s => /VERDICT:\s*CHANGES/.test(s || '')
const lastSum = x => x.runs[x.runs.length - 1]?.sum || ''
const attr = v => String(v).replace(/["\\]/g, '\\$&')

function stripAnsi(s) {
  return String(s ?? '')
    .replace(/\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g, '')
    .replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, '')
    .replace(/\u001b[@-_]/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
}

function el(tag, props, ...kids) {
  const e = document.createElement(tag)
  if (props) {
    for (const k in props) {
      const v = props[k]
      if (v == null || v === false) continue
      if (k === 'class') e.className = v
      else if (k === 'style') e.style.cssText = v
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v)
      else if (k.startsWith('__')) e[k] = v
      else e.setAttribute(k, v === true ? '' : v)
    }
  }
  for (const c of kids.flat(9)) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(String(c)))
  return e
}

const add = (node, ...k) => node.append(...k.flat(9).filter(x => x != null && x !== false))

function icon(name, w = 14) {
  const s = document.createElementNS(SVG_NS, 'svg')
  for (const [k, v] of Object.entries({ width: w, height: w, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) s.setAttribute(k, v)
  for (const [tag, attrs] of ICONS[name] || []) {
    const n = document.createElementNS(SVG_NS, tag)
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v)
    s.append(n)
  }
  return s
}

const animate = (node, frames, opts) => (typeof node.animate === 'function' ? node.animate(frames, opts) : null)

async function kanbanCall(path, board, opts = {}) {
  const api = typeof window !== 'undefined' ? window.hermesDesktop?.api : null
  if (typeof api !== 'function') throw new Error(BUNDLES.en.wingline.err.noBridge)
  const sep = path.includes('?') ? '&' : '?'
  const request = { path: `${KANBAN}${path}${board ? `${sep}board=${enc(board)}` : ''}`, method: opts.method || 'GET' }
  if (opts.body !== undefined) request.body = opts.body
  return api(request)
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

function defaultLimit(task) {
  const old = isNum(task.maxrt) && task.maxrt > 0 ? task.maxrt : null
  return old ? Math.max(1800, Math.round((old * 2) / 1800) * 1800) : 7200
}

function createApp(root, env) {
  const t = (key, ...args) => env.t(key, ...args)
  let D = null
  let T = []
  let BY = {}
  let ST = {}
  let T0 = Date.now()
  let LOADERR = null
  let DIRTY = false
  let SIG = ''
  let seq = 0
  let dead = false
  let doneLimit = DONE_PAGE
  let CARD = {}
  let ANCH = {}
  let DRAG = null
  let LINKGEN = 0
  let EV = []
  let RANGE = [0, 0]
  let LAST = 0
  let RSIG = ''
  let PI = 0
  let raf = 0
  const S = { board: readStore('board', null), view: 'board', sel: null, open: null, q: '', at: null, playing: false, speed: 1800, range: 86400, rail: true, groupOpen: {}, runOpen: {}, noteFor: null, noteMode: null, arm: null, check: null, hover: null, dlg: null, log: null }
  const seen = readStore(UNREAD_KEY, {})
  const SEEN = seen && typeof seen === 'object' ? { ...seen } : {}
  const OV = {}
  const UNDO = []
  const PENDING = {}
  const timers = new Set()
  const later = (fn, ms) => {
    const id = window.setTimeout(() => {
      timers.delete(id)
      if (!dead) fn()
    }, ms)
    timers.add(id)
    return id
  }
  const cancel = id => {
    window.clearTimeout(id)
    timers.delete(id)
  }
  const $ = s => root.querySelector(s)
  const $$ = s => [...root.querySelectorAll(s)]
  const now = () => (S.at != null ? S.at : (D ? D.now : Date.now() / 1000) + (Date.now() - T0) / 1000)

  const dur = s => {
    s = Math.max(0, Math.round(s || 0))
    if (s < 60) return t('wingline.unit.s', s)
    if (s < 3600) return t('wingline.unit.m', Math.floor(s / 60))
    if (s < 86400) return t('wingline.unit.hm', Math.floor(s / 3600), pad(Math.floor((s % 3600) / 60)))
    return t('wingline.unit.dh', Math.floor(s / 86400), Math.floor((s % 86400) / 3600))
  }
  const ago = s => (s < 60 ? t('wingline.justNow') : t('wingline.ago', dur(s).split(' ')[0]))
  const dhm = ts => {
    const d = new Date(ts * 1000)
    const n = new Date(now() * 1000)
    return (d.toDateString() === n.toDateString() ? '' : `${d.toLocaleDateString('en-GB', { weekday: 'short' })} `) + hm(ts)
  }
  const boardName = slug => D?.boards.find(b => b.slug === slug)?.name || slug
  const stat = r => ST[r] || ST.builder || null
  const label = x => (x.lens ? t(`wingline.lens.${x.lens}`) : x.labelKind ? t(`wingline.labelKind.${x.labelKind}`, x.label) : x.label)
  const lensName = x => (LENSES.includes(x.step) ? t(`wingline.lensShort.${x.step}`) : x.step)
  const pipeName = p => String(p).replace(/ r\d+$/, '').replace(/[-_]/g, ' ').replace(/^./, c => c.toUpperCase())
  const plainAct = x => {
    x = String(x || '').replace(/^▸\s*/, '')
    return /context compression/i.test(x) ? t('wingline.card.tidy') : x
  }
  const outWord = o => t(`wingline.out.${['completed', 'crashed', 'timed_out', 'blocked', 'rate_limited', 'gave_up', 'reclaimed', 'running'].includes(o) ? o : 'other'}`)

  function facts(story) {
    const f = story.facts || {}
    return {
      ...f,
      worked: dur(f.worked),
      limit: dur(f.limit),
      into: dur(f.into),
      silentFor: dur(f.silentFor),
      lastLife: isNum(f.lastLife) ? hm(f.lastLife) : '',
      tries: f.tries || 1,
      allowed: f.allowed || 1
    }
  }
  const causeOf = x => (x.story && CAUSES.includes(x.story.cause) ? x.story.cause : null)
  const tlText = x => {
    const args = (x.a || []).map((v, i) => ((DUR_ARGS[x.k] || []).includes(i) ? dur(v) : v))
    return t(`wingline.tl.${x.k}`, ...args)
  }

  function setData(d) {
    D = d
    T = d.tasks.filter(x => x && typeof x.id === 'string').map(x => ({ ...x, runs: Array.isArray(x.runs) ? x.runs : [], parents: x.parents || [], children: x.children || [] }))
    BY = Object.fromEntries(T.map(x => [x.id, x]))
    ST = d.stats || {}
    T0 = Date.now()
    for (const id of Object.keys(OV)) {
      const x = BY[id]
      if (!x || OV[id].sent || (OV[id].from && x.status !== OV[id].from)) delete OV[id]
    }
    if (!D.boards.some(b => b.slug === S.board)) S.board = null
  }

  function state(x) {
    if (x.status === 'archived' && !OV[x.id]) return { k: 'gone' }
    const at = now()
    const o = S.at == null ? OV[x.id] : null
    if (o) return o
    const ended = x.runs.filter(r => r.e)
    const lastEnd = ended[ended.length - 1]
    if (S.at == null) {
      if (x.status === 'done') return { k: 'done', since: x.done }
      if (x.status === 'running') {
        const r = x.runs[x.runs.length - 1]
        return { k: 'working', since: r ? r.s : x.created, run: r }
      }
      if (x.status === 'blocked' || x.status === 'review') return { k: 'needs', since: lastEnd ? lastEnd.e : x.created, why: x.reason }
      return { k: 'queued', since: lastEnd ? lastEnd.e : x.created }
    }
    if (at < x.created) return { k: 'absent' }
    if (x.done && x.done <= at) return { k: 'done', since: x.done }
    for (const r of x.runs) if (r.s <= at && (!r.e || at < r.e)) return { k: 'working', since: r.s, run: r }
    const before = x.runs.filter(r => r.e && r.e <= at)
    const last = before[before.length - 1]
    if (last && last.o !== 'completed') {
      const again = x.runs.some(r => r.s > last.e)
      if (last.o === 'blocked') return { k: 'needs', since: last.e, why: last.err || x.reason }
      if (!again && x.status === 'blocked') return { k: 'needs', since: last.e, why: x.reason || last.err }
    }
    return { k: 'queued', since: last ? last.e : x.created }
  }
  const boardTasks = b => T.filter(x => x.board === b && state(x).k !== 'gone')
  function counts(b) {
    const c = { needs: 0, working: 0, queued: 0, done: 0, usd: 0 }
    for (const x of boardTasks(b)) {
      const k = state(x).k
      if (c[k] != null) c[k]++
      if (k !== 'absent') c.usd += x.usd || 0
    }
    return c
  }
  const pipeOf = x => T.filter(y => y.board === x.board && y.pipe === x.pipe).sort((a, b) => (ROLEO[a.role] ?? 1) - (ROLEO[b.role] ?? 1) || a.created - b.created)
  const needsAll = () => T.filter(x => state(x).k === 'needs')
  function waitText(x) {
    const ps = x.parents.map(id => BY[id]).filter(Boolean)
    const open = ps.filter(p => state(p).k !== 'done')
    if (!open.length) return null
    if (ps.length === 1) return [t('wingline.card.waitsFor'), el('b', null, label(ps[0]))]
    return [t('wingline.card.waitsFor'), el('b', null, t('wingline.card.waitsMany', open.length, ps.length))]
  }
  function matches(x) {
    if (!S.q) return true
    return `${x.title} ${x.reason} ${x.outcome} ${label(x)}`.toLowerCase().includes(S.q.toLowerCase())
  }

  function toast(msg, act, bad) {
    const box = $('.wl-toasts')
    if (!box) return
    const node = el('div', { class: `toast${bad ? ' bad' : ''}`, role: bad ? 'alert' : 'status' }, el('div', null, msg), act && el('button', { class: 'btn', 'data-act': 'undo', onclick: () => { node.remove(); act() } }, t('wingline.toast.undo'), el('span', { class: 'kbd' }, 'Ctrl Z')))
    box.append(node)
    while (box.children.length > 3) box.firstChild.remove()
    later(() => {
      node.style.transition = 'opacity .4s'
      node.style.opacity = 0
      later(() => node.remove(), 400)
    }, act ? UNDO_MS : bad ? 9000 : 4200)
  }
  function fail(what, err) {
    console.warn(`[${ID}] ${what} failed`, err)
    toast(t('wingline.toast.failed', what, errText(err)), null, true)
  }

  async function runAgain(id, note, reply) {
    const x = BY[id]
    if (!x) return
    const text = (note || '').trim()
    S.noteFor = null
    OV[id] = { k: 'queued', since: now(), note: text || null, from: x.status }
    render()
    try {
      if (text) await kanbanCall(`/tasks/${enc(id)}/comments`, x.board, { method: 'POST', body: { body: text, author: 'wingline' } })
      const res = await kanbanCall(`/tasks/${enc(id)}`, x.board, { method: 'PATCH', body: { status: 'ready' } })
      if (res?.task && res.task.status === x.status) throw new Error(t('wingline.err.refused'))
      if (OV[id]) OV[id].sent = true
      toast(reply ? t('wingline.toast.replied', label(x)) : text ? t('wingline.toast.againNote', label(x)) : t('wingline.toast.again', label(x)))
    } catch (err) {
      delete OV[id]
      fail(reply ? t('wingline.toast.actReply') : t('wingline.toast.actAgain'), err)
    }
    render()
    load()
  }

  async function tell(id, text) {
    const x = BY[id]
    S.noteFor = null
    if (!x || !text.trim()) {
      render()
      return
    }
    render()
    try {
      await kanbanCall(`/tasks/${enc(id)}/comments`, x.board, { method: 'POST', body: { body: text.trim(), author: 'wingline' } })
      toast(t('wingline.toast.told'))
    } catch (err) {
      fail(t('wingline.toast.actTell'), err)
    }
    load()
  }

  function remove(id) {
    if (S.arm !== id) {
      S.arm = id
      render()
      later(() => {
        if (S.arm === id) {
          S.arm = null
          render()
        }
      }, 3000)
      return
    }
    const x = BY[id]
    S.arm = null
    OV[id] = { k: 'gone', from: x.status }
    if (S.open === id) closeDrawer()
    const undo = () => {
      cancel(PENDING[id])
      delete PENDING[id]
      delete OV[id]
      render()
      toast(t('wingline.toast.undone'))
    }
    PENDING[id] = later(() => commitRemove(id), UNDO_MS)
    UNDO.push({ id, fn: undo })
    render()
    toast(t('wingline.toast.removing', label(x)), undo)
  }
  async function commitRemove(id) {
    delete PENDING[id]
    const x = BY[id]
    if (!x) return
    try {
      const res = await kanbanCall(`/tasks/${enc(id)}`, x.board, { method: 'PATCH', body: { status: 'archived' } })
      if (res?.task && res.task.status !== 'archived') throw new Error(t('wingline.err.refused'))
      if (OV[id]) OV[id].sent = true
      if (!dead) toast(t('wingline.toast.removed', label(x)))
    } catch (err) {
      delete OV[id]
      if (!dead) {
        fail(t('wingline.toast.actRemove'), err)
        render()
      } else console.warn(`[${ID}] removing ${id} failed`, err)
    }
    if (!dead) load()
  }
  function undo() {
    const u = UNDO.pop()
    if (u && PENDING[u.id]) u.fn()
  }

  function openRetry(id) {
    const x = BY[id]
    S.dlg = { task: x, phase: 'confirm', hours: String(defaultLimit(x) / 3600), steps: planRetry(x.children.slice()) }
    renderDialog()
  }
  async function runRetry(limit) {
    const dlg = S.dlg
    const x = dlg.task
    let steps = dlg.steps.map(s => ({ ...s, state: 'pending', error: undefined }))
    let i = 0
    const push = patch => {
      if (S.dlg && S.dlg.task.id === x.id) {
        Object.assign(S.dlg, patch)
        renderDialog()
      }
    }
    const mark = (st, error) => {
      steps = steps.map((s, k) => (k === i ? { ...s, state: st, error } : s))
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
      const detail = await step(() => kanbanCall(`/tasks/${enc(x.id)}`, x.board))
      const src = detail?.task || {}
      const kids = Array.isArray(detail?.links?.children) ? detail.links.children : x.children
      const parents = Array.isArray(detail?.links?.parents) ? detail.links.parents : x.parents
      steps = [steps[0], ...planRetry(kids).slice(1)]
      push({ steps })
      const newId = await step(async () => {
        const res = await kanbanCall('/tasks', x.board, {
          method: 'POST',
          body: {
            title: src.title ?? x.title,
            body: src.body ?? null,
            assignee: src.assignee ?? x.assignee ?? null,
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
        const nid = res?.task?.id
        if (!nid) throw new Error(t('wingline.err.noId'))
        return nid
      })
      push({ newId })
      for (const child of kids) {
        await step(() => kanbanCall('/links', x.board, { method: 'POST', body: { parent_id: newId, child_id: child } }))
        await step(async () => {
          const res = await kanbanCall(`/links?parent_id=${enc(x.id)}&child_id=${enc(child)}`, x.board, { method: 'DELETE' })
          if (res && res.ok === false) throw new Error(t('wingline.err.refused'))
        })
      }
      await step(() => kanbanCall(`/tasks/${enc(x.id)}/comments`, x.board, { method: 'POST', body: { body: t('wingline.dlg.retryComment', newId, dur(limit)), author: 'wingline' } }))
      await step(async () => {
        const res = await kanbanCall(`/tasks/${enc(x.id)}`, x.board, { method: 'PATCH', body: { status: 'archived' } })
        if (res?.task && res.task.status !== 'archived') throw new Error(t('wingline.err.refused'))
      })
      push({ phase: 'done' })
    } catch (err) {
      fail(t('wingline.toast.actMore'), err)
      push({ phase: 'failed' })
    }
    load()
  }
  function stepText(s, x, limitText) {
    if (s.key === 'read') return t('wingline.dlg.stepRead', x.id)
    if (s.key === 'create') return t('wingline.dlg.stepCreate', limitText)
    if (s.key === 'link') return t('wingline.dlg.stepLink', s.child)
    if (s.key === 'unlink') return t('wingline.dlg.stepUnlink', x.id, s.child)
    if (s.key === 'comment') return t('wingline.dlg.stepComment', x.id)
    return t('wingline.dlg.stepArchive', x.id)
  }
  function renderDialog() {
    const sc = $('.scrim')
    const d = S.dlg
    if (!d) {
      sc.classList.remove('on')
      return
    }
    const x = d.task
    const hours = parseFloat(d.hours)
    const okLimit = isNum(hours) && hours >= 0.5
    const limit = okLimit ? Math.round(hours * 3600) : null
    const limitText = d.limit ? dur(d.limit) : limit ? dur(limit) : '—'
    const input = el('input', { class: 'lim', 'data-field': 'limit', type: 'number', min: '0.5', step: '0.5', value: d.hours, disabled: d.phase !== 'confirm', oninput: e => { d.hours = e.target.value; renderDialog(); const n = $('.lim'); if (n) { n.focus(); n.setSelectionRange?.(n.value.length, n.value.length) } } })
    const box = el('div', { class: 'dlg', role: 'dialog', 'aria-modal': 'true', 'data-dialog': 'retry', 'data-phase': d.phase, onclick: e => e.stopPropagation() },
      el('h3', null, t('wingline.dlg.retryTitle')), el('div', { class: 'dsub' }, label(x)),
      el('p', null, t('wingline.dlg.retryWhy')),
      el('label', { class: 'limrow' }, t('wingline.dlg.limit'), input),
      el('div', { class: 'sub' }, x.maxrt ? t('wingline.dlg.limitOld', dur(x.maxrt)) : t('wingline.dlg.limitNone')),
      !okLimit && d.phase === 'confirm' && el('div', { class: 'cwarn' }, t('wingline.dlg.limitBad')),
      el('div', { class: 'sub' }, t('wingline.dlg.willHappen')),
      el('ol', { class: 'steps' }, d.steps.map(s => el('li', { 'data-step': s.key, 'data-state': s.state }, el('span', null, stepText(s, x, limitText)), el('b', null, t(`wingline.dlg.state.${s.state}`)), s.error && el('code', null, s.error)))),
      el('div', { class: 'sub' }, t('wingline.dlg.retriesNote')),
      d.phase === 'done' && el('div', { class: 'cans' }, t('wingline.dlg.retryOk', d.newId)),
      d.phase === 'failed' && el('div', { class: 'cans bad' }, t('wingline.dlg.stoppedAt')),
      el('div', { class: 'acts' },
        d.phase === 'confirm' && el('button', { class: 'btn go', 'data-act': 'confirm', disabled: !okLimit, onclick: () => runRetry(limit) }, t('wingline.dlg.retryGo', limitText)),
        el('button', { class: 'btn', 'data-act': 'close', disabled: d.phase === 'running', onclick: closeScrim }, d.phase === 'confirm' ? t('wingline.dlg.cancel') : t('wingline.dlg.close'))))
    sc.replaceChildren(box)
    sc.classList.add('on')
  }

  function renderRail() {
    const rail = $('.rail')
    rail.replaceChildren()
    const nAll = needsAll()
    rail.append(
      el('div', { class: 'brand' }, el('div', { class: 'logo' }, 'W'), el('b', null, t('wingline.title')), el('button', { class: 'kbtn', title: t('wingline.rail.searchTitle'), onclick: openPalette }, t('wingline.rail.search'), el('span', { class: 'kbd' }, '/'))),
      el('button', { class: `attn${nAll.length ? '' : ' zero'}`, 'data-attn': nAll.length, onclick: () => setView('inbox') }, el('i', { class: 'dot' }), nAll.length ? t('wingline.rail.decisions', nAll.length) : t('wingline.rail.nothing'), el('span', { class: 'n' }, nAll.length || '')),
      el('div', { class: 'sec' }, el('span', null, t('wingline.rail.boards')), el('span', null, D.boards.length))
    )
    const bl = el('div', { class: 'boards' })
    for (const b of D.boards) {
      const c = counts(b.slug)
      const seg = el('div', { class: 'seg' })
      for (const [k, col] of COLS) if (c[k]) seg.append(el('i', { style: `flex:${c[k]};background:${col}` }))
      const badge = c.needs ? el('span', { class: 'bd red' }, c.needs) : c.working ? el('span', { class: 'spin' }) : el('span', { class: 'bd' }, usd(c.usd))
      bl.append(el('button', { class: `brow${b.slug === S.board ? ' on' : ''}${c.needs || c.working || c.queued ? '' : ' quiet'}`, 'data-board': b.slug, onclick: () => setBoard(b.slug), title: b.name }, el('span', { class: 'nm' }, b.name), badge, seg))
    }
    const live = T.filter(x => state(x).k === 'working')
    const al = el('div', { class: 'agents' })
    if (!live.length) al.append(el('div', { class: 'agent none' }, t('wingline.rail.noAgent')))
    for (const x of live) {
      const s = state(x)
      al.append(el('button', { class: 'agent', onclick: () => { setBoard(x.board); select(`t:${x.id}`); openDrawer(x.id) } }, el('span', { class: 'spin' }), el('span', { class: 't' }, x.title), el('span', { class: 'tm', 'data-since': s.since }, dur(now() - s.since)), el('span', { class: 'a', 'data-live': x.id }, `▸ ${S.at == null && x.act ? plainAct(x.act.text) : t('wingline.rail.working')}`)))
    }
    const errs = Array.isArray(D.errors) ? D.errors : []
    rail.append(bl, el('div', { class: 'sec' }, el('span', null, t('wingline.rail.agents')), el('span', null, live.length)), al,
      el('div', { class: 'rfoot' }, el('span', { 'data-updated': '1' }, t('wingline.rail.live', hm(Date.now() / 1000, 1))),
        errs.length || LOADERR ? el('div', { class: 'probs', role: 'alert' }, LOADERR || t('wingline.rail.problems', errs.length), errs.map(e => el('div', null, el('b', null, String(e?.source || '')), `: ${String(e?.message || '')}`))) : null))
  }

  function renderTop() {
    const b = D.boards.find(x => x.slug === S.board)
    const c = counts(S.board)
    const top = $('.tbar')
    const tab = (v, n, red) => el('button', { class: S.view === v ? 'on' : '', 'data-view': v, onclick: () => setView(v) }, t(`wingline.view.${v}`), n != null && el('span', { class: `c${red ? ' red' : ''}` }, n))
    const inN = needsAll().length
    let srch = $('.search')
    if (!srch) {
      srch = el('label', { class: 'search' }, icon('search'), el('input', { id: 'wl-q', placeholder: t('wingline.top.filter'), oninput: e => { S.q = e.target.value; renderView() } }), el('span', { class: 'kbd' }, 'F'))
    }
    top.replaceChildren(el('h1', null, b ? b.name : ''), el('span', { class: 'meta' }, t('wingline.top.meta', c.needs + c.working + c.queued + c.done, usd(c.usd))),
      el('div', { class: 'tabs' }, tab('board'), tab('list'), tab('inbox', inN || null, inN > 0)), srch,
      S.at == null ? el('span', { class: 'live', title: t('wingline.top.clockTitle') }, el('i'), el('span', { 'data-clock': '1' }, hm(now(), 1))) : el('span', { class: 'live rp' }, el('i'), t('wingline.top.replaying')),
      el('button', { class: 'rbtn', 'data-act': 'replay', onclick: toggleReplay, title: t('wingline.top.replayTitle') }, icon(S.at == null ? 'rewind' : 'bolt'), S.at == null ? t('wingline.top.replay') : t('wingline.top.goLive')))
  }

  const ageEl = s => el('span', { class: 'age', 'data-since': s.since }, dur(now() - s.since))
  const pchip = x => el('span', { class: 'pchip' }, el('i', { style: `background:${hue(x.pipe)}` }), x.pipe)

  function noteBox(x) {
    const mode = S.noteMode
    const quiet = x.act ? now() - x.act.at : 0
    const go = () => {
      const v = ta.value
      if (mode === 'tell') tell(x.id, v)
      else if (mode === 'reply') {
        if (!v.trim()) {
          ta.classList.add('shake')
          later(() => ta.classList.remove('shake'), 400)
          return
        }
        runAgain(x.id, v, true)
      } else runAgain(x.id, v)
    }
    const ta = el('textarea', { placeholder: t(`wingline.note.${mode}`), 'aria-label': t(`wingline.note.${mode}`), onkeydown: e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go() } if (e.key === 'Escape') { e.stopPropagation(); S.noteFor = null; render() } } })
    later(() => ta.isConnected && ta.focus(), 30)
    const hint = mode === 'tell' && quiet > QUIET ? el('div', { class: 'cwarn' }, t('wingline.note.silent', dur(quiet))) : el('div', { class: 'chint' }, mode === 'tell' ? t('wingline.note.hintTell') : mode === 'reply' ? t('wingline.note.hintReply') : t('wingline.note.hintAgain'))
    const goLabel = mode === 'tell' ? t('wingline.act.send') : mode === 'reply' ? t('wingline.note.goReply') : t('wingline.note.goAgain')
    return el('div', { class: 'note', 'data-note': mode, onclick: e => e.stopPropagation() }, ta, hint,
      el('div', { class: 'acts' }, el('button', { class: 'btn go', 'data-act': 'send', onclick: go }, goLabel, el('span', { class: 'kbd' }, '↵')), el('button', { class: 'btn', 'data-act': 'cancel', onclick: () => { S.noteFor = null; render() } }, t('wingline.act.cancel'))))
  }
  const openNote = (id, mode) => {
    S.noteFor = id
    S.noteMode = mode
    render()
  }

  function needActions(x, big) {
    if (S.noteFor === x.id) return noteBox(x)
    const cause = causeOf(x)
    const armed = S.arm === x.id
    const stop = fn => e => {
      e.stopPropagation()
      fn()
    }
    const rm = el('button', { class: `btn ${armed ? 'arm' : 'no'}`, 'data-act': 'remove', title: t('wingline.act.removeTitle'), onclick: stop(() => remove(x.id)) }, armed ? t('wingline.act.removeSure') : t('wingline.act.remove'))
    if (cause === 'review') return el('div', { class: `acts${big ? ' big' : ''}` }, el('button', { class: 'btn go', 'data-act': 'kanban', onclick: stop(() => env.navigate('/kanban')) }, t('wingline.act.kanban')))
    if (cause === 'asks_you') return el('div', { class: `acts${big ? ' big' : ''}` }, el('button', { class: 'btn go', 'data-act': 'reply', title: t('wingline.act.replyTitle'), onclick: stop(() => openNote(x.id, 'reply')) }, t('wingline.act.reply'), el('span', { class: 'kbd' }, 'Q')), rm)
    if (cause === 'time_limit') return el('div', { class: `acts${big ? ' big' : ''}` }, el('button', { class: 'btn go', 'data-act': 'more', title: t('wingline.act.moreTitle'), onclick: stop(() => openRetry(x.id)) }, t('wingline.act.more')), el('button', { class: 'btn', 'data-act': 'again', title: t('wingline.act.againTitle'), onclick: stop(() => openNote(x.id, 'again')) }, t('wingline.act.again')), rm)
    return el('div', { class: `acts${big ? ' big' : ''}` }, el('button', { class: 'btn go', 'data-act': 'again', title: t('wingline.act.againTitle'), onclick: stop(() => openNote(x.id, 'again')) }, t('wingline.act.again'), el('span', { class: 'kbd' }, 'Q')), rm)
  }

  function barLabel(role, elapsed, max) {
    const typ = ST[role]
    if (max && elapsed > max) return [el('span', null, t('wingline.card.pastLimit', dur(elapsed), dur(max))), el('span', null, '')]
    return [el('span', null, t('wingline.card.elapsed', dur(elapsed))), el('span', null, typ ? t('wingline.card.usualRange', Math.max(1, Math.round(typ.p25 / 60)), Math.max(1, Math.round(typ.p75 / 60))) : max ? t('wingline.card.limit', dur(max)) : '')]
  }
  function runBody(x, s, compact) {
    const elapsed = now() - s.since
    const typ = stat(x.role)
    const over = x.maxrt && elapsed > x.maxrt
    const top = typ ? typ.p90 * 1.1 : x.maxrt || 3600
    const frac = Math.min(1, elapsed / top)
    const mark = typ ? typ.p75 / top : null
    const line = S.at == null && x.act ? plainAct(x.act.text) : t('wingline.card.working')
    return [
      !compact && el('div', { class: 'livel' }, el('span', { class: 'spin' }), el('span', { 'data-live': x.id }, line)),
      el('div', { class: `bar${over ? ' over' : ''}`, 'data-bar': s.since, 'data-role': x.role, 'data-max': x.maxrt || '' }, el('i', { style: `width:${frac * 100}%` }), mark != null && el('span', { class: 'typ', style: `left:${mark * 100}%` })),
      el('div', { class: `barl${over ? ' over' : ''}`, 'data-barl': s.since, 'data-role': x.role, 'data-max': x.maxrt || '' }, barLabel(x.role, elapsed, x.maxrt))
    ]
  }
  function roundLine(x) {
    const m = roundOf(x.pipe)
    if (!m || m[2] === '1') return null
    const prev = T.filter(y => y.board === x.board && y.pipe === `${m[1]} r${m[2] - 1}`)
    const bad = prev.filter(y => verdictBad(lastSum(y)))
    const g = prev.find(y => y.step === 'gate')
    const why = bad.length ? t('wingline.card.found', bad.map(lensName).join(' + ')) : g && g.status === 'archived' ? t('wingline.card.askedChanges') : t('wingline.card.again')
    return el('div', { class: 'rline' }, el('span', null, '↻'), t('wingline.card.round', m[2], why))
  }
  function checkText(x) {
    const s = state(x)
    const elapsed = now() - s.since
    const typ = ST[x.role]
    const quiet = x.act ? now() - x.act.at : null
    if (quiet != null && quiet > QUIET) return { bad: true, text: t('wingline.check.stuck', dur(quiet)) }
    const last = x.act ? t('wingline.check.last', ago(quiet), plainAct(x.act.text)) : ''
    if (!typ) return { bad: false, text: last + t('wingline.check.plain', dur(elapsed)) }
    if (elapsed > typ.p90) return { bad: false, text: last + t('wingline.check.long', dur(elapsed), Math.round(typ.p90 / 60)) }
    return { bad: false, text: last + t('wingline.check.ok', dur(elapsed), Math.max(1, Math.round(typ.p25 / 60)), Math.max(1, Math.round(typ.p75 / 60))) }
  }
  function workActions(x) {
    if (S.noteFor === x.id) return noteBox(x)
    const ck = S.check === x.id && checkText(x)
    const stop = fn => e => {
      e.stopPropagation()
      fn()
    }
    return el('div', null, ck && el('div', { class: `cans${ck.bad ? ' bad' : ''}`, 'data-check': x.id }, ck.text),
      el('div', { class: 'acts' },
        el('button', { class: 'btn', 'data-act': 'check', title: t('wingline.act.checkTitle'), onclick: stop(() => { S.check = S.check === x.id ? null : x.id; render() }) }, t('wingline.act.check')),
        el('button', { class: 'btn', 'data-act': 'tell', title: t('wingline.act.tellTitle'), onclick: stop(() => openNote(x.id, 'tell')) }, t('wingline.act.tell'))))
  }
  function roleLine(x) {
    const n = x.runs.filter(r => r.s <= now()).length
    return n > 1 && state(x).k !== 'needs' ? el('div', { class: 'role' }, t('wingline.card.tryN', n)) : null
  }
  function badge(x) {
    const c = causeOf(x)
    return c ? el('div', { class: `badge ${c}`, 'data-cause': c }, el('i'), t(`wingline.badge.${c}`, facts(x.story))) : null
  }
  function taskCard(x, s) {
    const c = el('div', { class: `card ${s.k}${S.sel === `t:${x.id}` ? ' sel' : ''}`, 'data-nav': `t:${x.id}`, 'data-ids': x.id, 'data-pipe': x.pipe, tabindex: -1 })
    add(c, el('div', { class: 'ctop' }, pchip(x), ageEl(s)), el('div', { class: 'ctitle' }, label(x)), roundLine(x) || roleLine(x))
    if (s.k === 'needs') {
      add(c, S.at == null && badge(x) ? badge(x) : el('div', { class: 'why' }, s.why || ''))
      if (S.at == null) add(c, needActions(x))
    }
    if (s.k === 'working') {
      add(c, ...runBody(x, s))
      if (S.at == null) add(c, workActions(x))
    }
    if (s.k === 'queued') {
      const w = waitText(x)
      add(c, el('div', { class: 'wait' }, w || (s.note ? [t('wingline.card.requeued'), ' · ', el('b', null, t('wingline.card.withNote', s.note))] : s.from ? t('wingline.card.requeued') : t('wingline.card.ready'))))
    }
    const typ = ST[x.role]
    add(c, el('div', { class: 'cfoot' }, s.k === 'queued' && !x.usd ? (typ ? el('span', null, t('wingline.card.usually', usd(typ.usd))) : null) : el('span', { class: 'usd', 'data-usd': x.id }, `${x.usdKind === 'estimated' ? '≈ ' : ''}${usd(x.usd)}`), x.comments ? el('span', null, t('wingline.card.notes', x.comments)) : null))
    CARD[x.id] = c
    ANCH[x.id] = c
    return c
  }
  function stackCard(ts, k) {
    const t0 = ts[0]
    const c = el('div', { class: `card ${k} stack`, 'data-ids': ts.map(x => x.id).join(','), 'data-pipe': t0.pipe })
    const s0 = state(t0)
    add(c, el('div', { class: 'ctop' }, pchip(t0), ageEl(s0)), el('div', { class: 'ctitle' }, t('wingline.card.checks', ts.length)))
    const rows = el('div', { class: 'srows' })
    for (const x of ts) {
      const s = state(x)
      const r = el('div', { class: `srow${S.sel === `t:${x.id}` ? ' sel' : ''}`, 'data-nav': `t:${x.id}`, 'data-pipe': x.pipe, tabindex: -1 }, el('i', { class: `sd ${s.k}` }), el('span', null, label(x)), el('span', { class: 'tm', 'data-since': k === 'working' ? s.since : null }, k === 'working' ? dur(now() - s.since) : x.usd ? usd(x.usd) : ''))
      rows.append(r)
      CARD[x.id] = c
      ANCH[x.id] = r
    }
    add(c, rows)
    if (k === 'queued') add(c, el('div', { class: 'wait' }, waitText(t0) || t('wingline.card.readyMany')))
    if (k === 'working') add(c, ...runBody(t0, s0, true))
    const sum = ts.reduce((a, x) => a + (x.usd || 0), 0)
    const typ = stat(t0.role)
    add(c, el('div', { class: 'cfoot' }, sum ? el('span', { class: 'usd' }, usd(sum)) : typ ? el('span', null, t('wingline.card.usually', usd(typ.usd * ts.length))) : null))
    return c
  }
  function pipeResult(pipe, ts, all) {
    const g = pipeOf(ts[0]).find(x => x.step === 'gate')
    const bad = ts.filter(x => verdictBad(lastSum(x)))
    const m = roundOf(pipe)
    const next = m ? +m[2] + 1 : 2
    if (bad.length) return el('div', { class: 'res back' }, el('span', null, '↻'), t('wingline.res.back', bad.map(lensName).join(' + '), next))
    if (g && g.status === 'archived') return el('div', { class: 'res back' }, el('span', null, '↻'), t('wingline.res.backYou', next))
    if (g && /merged/i.test(lastSum(g))) return el('div', { class: 'res ok' }, el('span', null, '✓'), m && m[2] !== '1' ? t('wingline.res.mergedRound', m[2]) : t('wingline.res.merged'))
    if (g && /approv|PASS|ship/i.test(lastSum(g))) return el('div', { class: 'res ok' }, el('span', null, '✓'), t('wingline.res.approved'))
    return el('div', { class: 'res ok' }, el('span', null, '✓'), ts.length === all ? t('wingline.res.all', all) : t('wingline.res.some', ts.length, all))
  }
  function doneCard(pipe, ts, all) {
    const open = !!S.groupOpen[pipe]
    const last = ts.reduce((a, x) => Math.max(a, x.done || 0), 0)
    const c = el('div', { class: `card done grp${open ? ' open' : ''}${S.sel === `g:${pipe}` ? ' sel' : ''}`, 'data-nav': `g:${pipe}`, 'data-ids': ts.map(x => x.id).join(','), 'data-pipe': pipe, tabindex: -1 })
    const chev = icon('chev', 13)
    chev.classList.add('chev')
    add(c, el('div', { class: 'ctop' }, pchip(ts[0]), el('span', { class: 'age' }, ago(now() - last))), el('div', { class: 'ctitle row' }, chev, pipeName(pipe)), pipeResult(pipe, ts, all))
    if (open) {
      const rows = el('div', { class: 'srows' })
      for (const x of ts) {
        const r = el('div', { class: `srow${S.sel === `t:${x.id}` ? ' sel' : ''}`, 'data-nav': `t:${x.id}`, 'data-pipe': pipe, tabindex: -1 }, el('i', { class: 'sd done' }), el('span', null, label(x)), el('span', { class: 'tm' }, usd(x.usd)))
        rows.append(r)
        ANCH[x.id] = r
      }
      add(c, rows)
    }
    for (const x of ts) {
      CARD[x.id] = c
      ANCH[x.id] = ANCH[x.id] || c
    }
    const took = ts.reduce((a, x) => a + x.runs.reduce((y, r) => y + ((r.e || r.s) - r.s), 0), 0)
    add(c, el('div', { class: 'cfoot' }, el('span', { class: 'usd' }, usd(ts.reduce((a, x) => a + (x.usd || 0), 0))), el('span', null, t('wingline.card.steps', ts.length, dur(took)))))
    return c
  }

  function renderBoard(view, anim) {
    const before = {}
    for (const id in CARD) if (CARD[id].isConnected) before[id] = CARD[id].getBoundingClientRect()
    CARD = {}
    ANCH = {}
    const bd = el('div', { class: 'board' })
    const ts = boardTasks(S.board).map(x => [x, state(x)]).filter(([x, s]) => s.k !== 'absent' && s.k !== 'gone' && matches(x))
    for (const [k, col] of COLS) {
      const list = ts.filter(([, s]) => s.k === k)
      const sum = list.reduce((a, [x]) => a + (x.usd || 0), 0)
      const cards = el('div', { class: 'cards' })
      bd.append(el('div', { class: `col${list.length ? '' : ' empty'}`, 'data-col': k }, el('div', { class: 'chead' }, el('i', { class: 'gl', style: `background:${col}` }), el('b', null, t(`wingline.col.${k}`)), el('span', { class: 'n' }, list.length), el('span', { class: 'sum' }, list.length ? usd(sum) : '')), cards))
      if (k === 'done') {
        const g = {}
        for (const [x] of list) (g[x.pipe] = g[x.pipe] || []).push(x)
        const groups = Object.entries(g).sort((a, b) => Math.max(...b[1].map(x => x.done || 0)) - Math.max(...a[1].map(x => x.done || 0)))
        groups.slice(0, doneLimit).forEach(([p, arr]) => cards.append(doneCard(p, arr.sort((a, b) => (ROLEO[a.role] ?? 1) - (ROLEO[b.role] ?? 1)), pipeOf(arr[0]).length)))
        if (groups.length > doneLimit) cards.append(el('button', { class: 'more', onclick: () => { doneLimit = 999; render() } }, t('wingline.card.more', groups.length - doneLimit)))
        continue
      }
      list.sort(([a, sa], [b, sb]) => (k === 'queued' ? a.pipe.localeCompare(b.pipe) || (ROLEO[a.role] ?? 1) - (ROLEO[b.role] ?? 1) : sa.since - sb.since))
      const used = new Set()
      for (const [x, s] of list) {
        if (used.has(x.id)) continue
        const sib = x.role === 'review' && x.parents.length ? list.filter(([y]) => y.pipe === x.pipe && y.role === 'review' && JSON.stringify(y.parents) === JSON.stringify(x.parents)).map(([y]) => y) : [x]
        sib.forEach(y => used.add(y.id))
        cards.append(sib.length > 1 && k !== 'needs' ? stackCard(sib, k) : taskCard(x, s))
      }
    }
    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttribute('class', 'pin')
    bd.append(svg)
    const hv = S.hover
    S.hover = null
    view.replaceChildren(bd)
    wireBoard(bd)
    if (hv && !(S.at != null && S.playing)) {
      later(() => {
        if (bd.isConnected && !S.hover) hover(bd, hv)
      }, 520)
    }
    const done = new Set()
    for (const id in CARD) {
      const node = CARD[id]
      if (done.has(node)) continue
      done.add(node)
      const from = node.dataset.ids.split(',').map(i => before[i]).find(Boolean)
      if (from && anim !== 'enter') {
        const to = node.getBoundingClientRect()
        const dx = from.left - to.left
        const dy = from.top - to.top
        if (Math.abs(dx) + Math.abs(dy) > 2) animate(node, [{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' })
        if (Math.abs(dx) > 40) node.classList.add('flash', ...(node.classList.contains('needs') ? ['red'] : []))
      } else if (anim === 'enter' || Object.keys(before).length) {
        node.classList.add('enter')
        node.addEventListener('animationend', () => node.classList.remove('enter'), { once: true })
        node.style.animationDelay = `${anim === 'enter' ? Math.min(400, done.size * 28) : 0}ms`
      }
    }
  }
  function hover(bd, p) {
    S.hover = p
    bd.classList.toggle('hov', !!p)
    bd.querySelectorAll('[data-pipe]').forEach(x => x.classList.toggle('hl', x.dataset.pipe === p))
    drawLinks(p)
  }
  async function drawLinks(pipe) {
    const bd = $('.board')
    if (!bd) return
    const svg = bd.querySelector('svg.pin')
    svg.replaceChildren()
    if (!pipe) return
    const gen = ++LINKGEN
    const moving = typeof bd.getAnimations === 'function' ? bd.getAnimations({ subtree: true }).filter(a => Number.isFinite(a.effect?.getComputedTiming().iterations) && a.playState === 'running') : []
    if (moving.length) {
      await Promise.all(moving.map(a => a.finished.catch(err => console.warn(`[${ID}] animation`, err))))
      if (gen !== LINKGEN || S.hover !== pipe || !bd.isConnected) return
      svg.replaceChildren()
    }
    svg.style.width = `${bd.scrollWidth}px`
    svg.style.height = `${bd.scrollHeight}px`
    const br = svg.getBoundingClientRect()
    const pos = n => {
      const r = n.getBoundingClientRect()
      return { l: r.left - br.left, r: r.right - br.left, y: r.top - br.top + Math.min(r.height / 2, 22) }
    }
    const drawn = new Set()
    for (const x of boardTasks(S.board).filter(y => y.pipe === pipe)) {
      for (const pid of x.parents) {
        const a = ANCH[pid]
        const b = ANCH[x.id]
        if (!a || !b || a === b) continue
        const key = a.dataset.nav + b.dataset.nav
        if (drawn.has(key)) continue
        drawn.add(key)
        const p = pos(a)
        const q = pos(b)
        let x1
        let x2
        if (p.r < q.l) [x1, x2] = [p.r, q.l]
        else if (q.r < p.l) [x1, x2] = [p.l, q.r]
        else [x1, x2] = [p.r, q.r]
        const dx = Math.max(40, Math.abs(x2 - x1) / 2)
        const same = x1 === p.r && x2 === q.r
        const d = same ? `M${x1} ${p.y} C${x1 + 30} ${p.y} ${x2 + 30} ${q.y} ${x2} ${q.y}` : `M${x1} ${p.y} C${x1 + (x2 > x1 ? dx : -dx)} ${p.y} ${x2 - (x2 > x1 ? dx : -dx)} ${q.y} ${x2} ${q.y}`
        const path = document.createElementNS(SVG_NS, 'path')
        for (const [k, v] of Object.entries({ d, fill: 'none', stroke: hue(pipe), 'stroke-width': 1.6, 'stroke-dasharray': '4 4', opacity: 0.85 })) path.setAttribute(k, v)
        animate(path, [{ strokeDashoffset: 40 }, { strokeDashoffset: 0 }], { duration: 1200, iterations: Infinity })
        const dot = document.createElementNS(SVG_NS, 'circle')
        for (const [k, v] of Object.entries({ cx: x2, cy: q.y, r: 3, fill: hue(pipe) })) dot.setAttribute(k, v)
        svg.append(path, dot)
      }
    }
  }
  function wireBoard(bd) {
    bd.addEventListener('mouseover', e => {
      const c = e.target.closest('[data-pipe]')
      const p = c ? c.dataset.pipe : null
      if (p === S.hover || DRAG || (S.at != null && S.playing)) return
      hover(bd, p)
    })
    bd.addEventListener('mouseleave', () => hover(bd, null))
    bd.addEventListener('click', e => {
      if (e.target.closest('button,textarea')) return
      const n = e.target.closest('[data-nav]')
      if (!n) return
      const k = n.dataset.nav
      select(k)
      if (k.startsWith('g:')) {
        S.groupOpen[k.slice(2)] = !S.groupOpen[k.slice(2)]
        render()
      } else openDrawer(k.slice(2))
    })
    bd.addEventListener('pointerdown', dragStart)
  }

  function dragStart(e) {
    if (e.button !== 0 || e.target.closest('button,textarea') || S.at != null) return
    const card = e.target.closest('.card')
    if (!card) return
    DRAG = { card, col: card.closest('.col').dataset.col, x: e.clientX, y: e.clientY, on: false, ids: card.dataset.ids.split(',') }
    window.addEventListener('pointermove', dragMove)
    window.addEventListener('pointerup', dragEnd, { once: true })
  }
  function dragMove(e) {
    const d = DRAG
    if (!d) return
    if (!d.on) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 5) return
      d.on = true
      d.r = d.card.getBoundingClientRect()
      d.ghost = d.card.cloneNode(true)
      d.ghost.classList.add('ghost')
      d.ghost.classList.remove('sel', 'enter')
      d.ghost.style.width = `${d.r.width}px`
      root.querySelector('.wl-app').append(d.ghost)
      d.card.classList.add('dragging')
      hover($('.board'), null)
    }
    d.ghost.style.left = `${d.r.left + e.clientX - d.x}px`
    d.ghost.style.top = `${d.r.top + e.clientY - d.y}px`
    const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('.col')
    $$('.col').forEach(c => c.classList.remove('drop', 'nodrop'))
    if (over && root.contains(over) && over.dataset.col !== d.col) over.classList.add(rule(d, over.dataset.col).ok ? 'drop' : 'nodrop')
    d.to = over && root.contains(over) ? over.dataset.col : null
  }
  function rule(d, to) {
    const x = BY[d.ids[0]]
    if (d.col === 'needs' && to === 'queued' && x && x.status === 'blocked' && causeOf(x) !== 'asks_you') return { ok: true }
    if (d.col === 'working') return { ok: false, msg: t('wingline.drag.working') }
    if (to === 'done') return { ok: false, msg: t('wingline.drag.done') }
    if (to === 'working') return { ok: false, msg: t('wingline.drag.start') }
    if (to === 'needs') return { ok: false, msg: t('wingline.drag.block') }
    if (d.col === 'done') return { ok: false, msg: t('wingline.drag.reopen') }
    return { ok: false, msg: t('wingline.drag.none') }
  }
  function dragEnd() {
    window.removeEventListener('pointermove', dragMove)
    const d = DRAG
    DRAG = null
    if (!d) return
    $$('.col').forEach(c => c.classList.remove('drop', 'nodrop'))
    if (!d.on) return
    const r = d.to && d.to !== d.col ? rule(d, d.to) : { ok: false }
    if (r.ok) {
      d.ghost.remove()
      d.card.classList.remove('dragging')
      openNote(d.ids[0], 'again')
      return
    }
    d.ghost.classList.add('back')
    d.ghost.style.left = `${d.r.left}px`
    d.ghost.style.top = `${d.r.top}px`
    d.ghost.style.transform = 'none'
    later(() => {
      d.ghost.remove()
      d.card.classList.remove('dragging')
      if (r.msg) {
        d.card.classList.add('shake')
        later(() => d.card.classList.remove('shake'), 400)
      }
    }, 300)
    if (r.msg) toast(r.msg, null, true)
  }

  function renderList(view) {
    ANCH = {}
    CARD = {}
    const wrap = el('div', { class: 'list' })
    const g = {}
    for (const x of boardTasks(S.board)) if (state(x).k !== 'absent' && matches(x)) (g[x.pipe] = g[x.pipe] || []).push(x)
    const rank = ts => {
      const ks = ts.map(x => state(x).k)
      return ks.includes('needs') ? 0 : ks.includes('working') ? 1 : ks.includes('queued') ? 2 : 3
    }
    const groups = Object.entries(g).sort((a, b) => rank(a[1]) - rank(b[1]) || Math.max(...b[1].map(x => x.done || x.created)) - Math.max(...a[1].map(x => x.done || x.created)))
    for (const [p, ts0] of groups) {
      const ts = ts0.sort((a, b) => (ROLEO[a.role] ?? 1) - (ROLEO[b.role] ?? 1) || a.created - b.created)
      const rk = rank(ts)
      const open = S.groupOpen[`l:${p}`] ?? rk < 3
      const st = rk === 0 ? [t('wingline.list.needs'), 'red'] : rk === 1 ? [t('wingline.list.working'), 'gold'] : rk === 2 ? [t('wingline.list.queued'), ''] : [t('wingline.list.shipped', ago(now() - Math.max(...ts.map(x => x.done || 0)))), '']
      const grp = el('div', { class: 'lgrp' }, el('button', { class: 'lhead', 'data-nav': `g:${p}`, onclick: () => { S.groupOpen[`l:${p}`] = !open; render() } },
        el('i', { class: 'sq', style: `background:${hue(p)}` }), el('span', null, el('span', { class: 'nm' }, p), el('span', { class: `st ${st[1]}` }, st[0])),
        el('div', { class: 'dots' }, ts.map(x => el('i', { class: state(x).k, title: label(x) }))), el('span', { class: 'mono dim' }, t('wingline.list.tasks', ts.length)), el('span', { class: 'mono rt' }, usd(ts.reduce((a, x) => a + (x.usd || 0), 0)))))
      if (open) {
        for (const x of ts) {
          const s = state(x)
          const sub = s.k === 'needs' ? el('span', { class: 's2 red' }, causeOf(x) ? t(`wingline.badge.${causeOf(x)}`, facts(x.story)) : s.why) : s.k === 'working' ? el('span', { class: 's2 mono', 'data-live': x.id }, `▸ ${S.at == null && x.act ? plainAct(x.act.text) : t('wingline.card.working')}`) : s.k === 'queued' ? el('span', { class: 's2' }, waitText(x) || t('wingline.card.ready')) : el('span', { class: 's2' }, x.done ? t('wingline.list.finished', ago(now() - x.done)) : t('wingline.list.done'))
          const row = el('div', { class: `lrow${S.sel === `t:${x.id}` ? ' sel' : ''}`, 'data-nav': `t:${x.id}`, tabindex: -1, onclick: () => { select(`t:${x.id}`); openDrawer(x.id) } },
            el('i', { class: `sd ${s.k}` }), el('span', { class: 'nm' }, label(x)), sub,
            el('span', { class: 'r', 'data-since': s.k === 'working' || s.k === 'needs' ? s.since : null }, s.k === 'done' ? dur(x.runs.reduce((y, r) => y + ((r.e || r.s) - r.s), 0)) : dur(now() - s.since)),
            el('span', { class: 'r' }, x.runs.length ? t('wingline.list.runs', x.runs.length) : '—'), el('span', { class: 'r ink' }, usd(x.usd)))
          grp.append(row)
          ANCH[x.id] = row
        }
      }
      wrap.append(grp)
    }
    view.replaceChildren(wrap)
  }

  function inboxItems() {
    const at = now()
    const items = []
    for (const x of T) {
      const s = state(x)
      if (s.k === 'needs') items.push({ key: `t:${x.id}`, x, kind: 'needs', ts: s.since, title: label(x), sub: causeOf(x) ? t(`wingline.badge.${causeOf(x)}`, facts(x.story)) : s.why })
    }
    const g = {}
    for (const x of T) {
      if (x.done && at - x.done < 3 * 86400 && x.done <= at) {
        const k = `${x.board}|${x.pipe}`
        ;(g[k] = g[k] || []).push(x)
      }
    }
    for (const ts of Object.values(g)) {
      const all = pipeOf(ts[0]).filter(x => state(x).k !== 'gone')
      if (!all.every(x => state(x).k === 'done')) continue
      const gate = all.find(x => x.role === 'gate') || ts[0]
      items.push({ key: `t:${gate.id}`, x: gate, kind: 'shipped', ts: Math.max(...all.map(x => x.done)), title: t('wingline.inbox.shipped', ts[0].pipe), sub: t('wingline.inbox.allDone', all.length) })
    }
    for (const x of T) {
      for (const r of x.runs) {
        if (r.e && r.e <= at && at - r.e < 86400 && (r.o === 'crashed' || r.o === 'timed_out') && state(x).k !== 'needs') items.push({ key: `t:${x.id}`, x, kind: 'crash', ts: r.e, title: t('wingline.inbox.crashed', label(x)), sub: t('wingline.inbox.endedAs', outWord(r.o)) })
      }
    }
    return items.sort((a, b) => (a.kind === 'needs' ? 0 : 1) - (b.kind === 'needs' ? 0 : 1) || b.ts - a.ts)
  }
  function renderInbox(view) {
    ANCH = {}
    CARD = {}
    const items = inboxItems()
    const wrap = el('div', { class: 'inbox' })
    const list = el('div', { class: 'ilist' })
    if (!S.sel || !items.some(i => i.key === S.sel)) S.sel = items[0]?.key || null
    let sec = null
    for (const it of items) {
      const s = it.kind === 'needs' ? t('wingline.inbox.needs') : t('wingline.inbox.since')
      if (s !== sec) {
        sec = s
        list.append(el('div', { class: 'sec' }, el('span', null, s)))
      }
      const unread = it.kind !== 'needs' && !SEEN[`${it.key}@${it.ts}`]
      list.append(el('button', { class: `irow${S.sel === it.key ? ' sel' : ''}`, 'data-nav': it.key, 'data-kind': it.kind, onclick: () => { select(it.key); markSeen(it); render() } },
        el('i', { class: `u${it.kind === 'needs' ? ' red' : unread ? ' blue' : ''}` }), el('span', { class: 't' }, it.title), el('span', { class: 'tm' }, ago(now() - it.ts)),
        el('span', { class: 's' }, `${boardName(it.x.board)} · ${it.sub}`)))
    }
    const det = el('div', { class: 'idet' })
    if (!items.length) det.append(el('div', { class: 'empty-st' }, el('div', null, el('b', null, t('wingline.inbox.clear')), t('wingline.inbox.clearSub'))))
    else if (S.sel && BY[S.sel.slice(2)]) det.append(detail(BY[S.sel.slice(2)]))
    wrap.append(list, det)
    view.replaceChildren(wrap)
  }
  function markSeen(it) {
    SEEN[`${it.key}@${it.ts}`] = 1
    const keep = Object.keys(SEEN).slice(-300)
    writeStore(UNREAD_KEY, Object.fromEntries(keep.map(k => [k, 1])))
  }

  function layers(ts) {
    const L = {}
    const lay = x => L[x.id] ?? (L[x.id] = x.parents.filter(p => BY[p] && BY[p].pipe === x.pipe && BY[p].id !== x.id).reduce((m, p) => Math.max(m, lay(BY[p]) + 1), 0))
    ts.forEach(lay)
    const out = []
    ts.forEach(x => (out[L[x.id]] = out[L[x.id]] || []).push(x))
    return out.filter(Boolean)
  }
  function loopBlock(x) {
    const m = roundOf(x.pipe)
    if (!m) return null
    const base = m[1]
    const rounds = {}
    for (const y of T) {
      const k = y.board === x.board && roundOf(y.pipe)
      if (k && k[1] === base) (rounds[k[2]] = rounds[k[2]] || []).push(y)
    }
    const ns = Object.keys(rounds).map(Number).sort((a, b) => a - b)
    const verdict = y => {
      const s = state(y).k
      if (s !== 'done' && s !== 'gone') return s
      return verdictBad(lastSum(y)) ? 'bad' : 'ok'
    }
    const short = s => {
      s = s.replace(/^(VERDICT:\s*\w+\s*[—-]\s*|Round \d+:\s*|escalation:\s*)/, '')
      const q = s.match(/^(.{15,150}?[.;(])(\s|$)/)
      return q ? q[1].replace(/[(;.]$/, '') : s.length > 150 ? `${s.slice(0, 150).replace(/\s+\S*$/, '')}…` : s
    }
    const box = el('div', { class: 'loop', 'data-loop': base }, el('div', { class: 'lph' }, el('span', null, t('wingline.det.loop')), el('span', null, ns.length === 1 ? t('wingline.det.round1') : t('wingline.det.rounds', ns.length))))
    for (const n of ns) {
      const R = rounds[n]
      const by = s => R.find(y => y.step === s)
      const b = by('build')
      const g = by('gate')
      const lens = CHECKS.map(by).filter(Boolean)
      const bad = lens.filter(y => verdict(y) === 'bad')
      const gs = g ? lastSum(g) : ''
      const asked = !!g && state(g).k === 'gone'
      const call = asked && /Needs your call on (.{8,90}?)(?: \(|[.;]\s|$)/.exec(gs)
      const merged = g && state(g).k === 'done' && /merged/i.test(gs)
      const gk = merged ? 'ok' : bad.length || asked ? 'bad' : g ? state(g).k : 'queued'
      const node = (y, text, k) => el('button', { class: `lpn ${k}${y && y.id === x.id ? ' me' : ''}`, onclick: () => y && (select(`t:${y.id}`), openDrawer(y.id)) }, text)
      box.append(el('div', { class: 'lpr', 'data-round': n }, el('span', { class: 'lpk' }, `R${n}`),
        node(b, t('wingline.lens.build'), b ? (state(b).k === 'done' ? 'ok' : state(b).k) : 'queued'), el('i', { class: 'lpa' }),
        el('span', { class: 'lpl' }, lens.map(y => node(y, lensName(y), verdict(y)))), el('i', { class: 'lpa' }),
        node(g, merged ? t('wingline.det.mergedNode') : gk === 'bad' ? t('wingline.det.backNode') : t('wingline.det.okNode'), gk)))
      const why = bad.length ? t('wingline.det.loopWhy', bad.map(lensName).join(' + '), short(lastSum(bad[0]))) : call ? t('wingline.det.loopYou', call[1].replace(/\.$/, '')) : asked ? t('wingline.det.loopYouPlain') : ''
      if (why) box.append(el('div', { class: 'lpb' }, el('span', { class: 'lpc' }, '↻'), el('span', null, why, el('b', null, t('wingline.det.toRound', n + 1)))))
    }
    return box
  }
  function storyBlock(x) {
    const y = x.story
    const c = causeOf(x)
    const F = facts(y)
    const tl = (y.tl || []).filter(e => isNum(e.ts))
    const box = el('div', { class: 'story', 'data-story': c }, el('div', { class: 'shead' }, t(`wingline.head.${c}`, F)), y.asked && el('div', { class: 'sask' }, t('wingline.asked', y.asked)), el('div', { class: 'swhy' }, t(`wingline.why.${c}`, F), ' ', t('wingline.kids', F.kids || 0)))
    if (c === 'asks_you' && y.question) add(box, el('div', { class: 'quote' }, el('div', { class: 'qh' }, t('wingline.question')), el('div', null, y.question)))
    add(box, needActions(x, true))
    if (S.noteFor !== x.id) {
      const hint = c === 'review' ? null : c === 'asks_you' ? [[t('wingline.act.reply'), t('wingline.act.hintReply')]] : c === 'time_limit' ? [[t('wingline.act.more'), t('wingline.act.hintMore')], [t('wingline.act.again'), t('wingline.act.hintAgain')]] : [[t('wingline.act.again'), t('wingline.act.hintAgain')]]
      if (hint) add(box, el('div', { class: 'hint' }, [...hint, [t('wingline.act.remove'), t('wingline.act.hintRemove')]].map(([a, b]) => el('span', null, el('b', null, a), ` ${b}`))))
    }
    if (tl.length) {
      const lastE = tl[tl.length - 1]
      const tip = el('div', { class: 'tltip' })
      const show = e => {
        tip.replaceChildren()
        add(tip, el('b', null, dhm(e.ts)), tlText(e), e.q ? el('code', null, e.q) : null)
        box.querySelectorAll('.tdot').forEach(n => n.classList.toggle('on', n.__x === e))
      }
      const line = el('div', { class: 'tline' }, el('i', { class: 'trail' }), ...tl.map((e, i) => el('button', { class: `tdot ${e.tone}`, 'aria-label': tlText(e), style: `left:${4 + (92 * i) / Math.max(1, tl.length - 1)}%`, __x: e, onmouseenter: () => show(e), onfocus: () => show(e), onclick: () => show(e) })))
      add(box, el('div', { class: 'tlbox' }, el('div', { class: 'tlh' }, el('span', null, t('wingline.det.how')), el('span', null, `${dhm(tl[0].ts)} → ${dhm(lastE.ts)}`)), line, tip))
      show(lastE)
    }
    return box
  }
  function detail(x) {
    const s = state(x)
    const d = el('div', { class: 'det', 'data-id': x.id })
    add(d, el('div', { class: 'ctop' }, pchip(x), el('span', null, `· ${boardName(x.board)}`), el('span', { class: `pill ${s.k}` }, s.k === 'working' && el('span', { class: 'spin sm' }), t(`wingline.pill.${s.k}`))),
      el('h2', null, label(x)), el('div', { class: 'role' }, t('wingline.det.step', x.idx || 1, x.of || 1, pipeName(x.pipe))))
    const lp = loopBlock(x)
    if (lp) add(d, lp)
    else {
      const st = el('div', { class: 'stepper' })
      const LY = layers(pipeOf(x))
      LY.forEach((L, i) => {
        if (i) st.append(el('i', { class: 'link' }))
        st.append(el('div', { class: `layer${LY.length === 1 ? ' flat' : ''}` }, L.map(y => el('button', { class: `node${y.id === x.id ? ' me' : ''}`, onclick: () => { select(`t:${y.id}`); openDrawer(y.id) } }, el('i', { class: `sd ${state(y).k}` }), label(y)))))
      })
      add(d, st)
    }
    if (s.k === 'needs' && causeOf(x) && S.at == null) add(d, storyBlock(x))
    else if (s.k === 'needs') add(d, el('div', { class: 'dsec' }, el('h3', null, t('wingline.det.whyStopped')), el('div', { class: 'box red' }, el('div', { class: 'why big' }, s.why || ''), S.at == null && needActions(x, true))))
    if (s.k === 'working') add(d, el('div', { class: 'dsec' }, el('h3', null, t('wingline.det.live')), el('div', { class: 'box' }, ...runBody(x, s), S.at == null && workActions(x), S.at == null && x.act && el('div', { class: 'barl' }, el('span', { 'data-ago': x.act.at }, t('wingline.det.lastUpdate', ago(now() - x.act.at))), el('span', null, '')))))
    if (s.k === 'queued') add(d, el('div', { class: 'dsec' }, el('h3', null, t('wingline.det.waiting')), el('div', { class: 'box' }, el('div', { class: 'wait flat' }, waitText(x) || t('wingline.det.readyWait')))))
    if (s.k === 'done') {
      const r = x.runs.filter(y => y.e)
      const took = r.reduce((a, y) => a + y.e - y.s, 0)
      add(d, el('div', { class: 'res ok big' }, el('span', null, '✓'), t('wingline.res.finished') + (took ? t('wingline.res.took', dur(took)) : '') + (x.usd ? ` · ${usd(x.usd)}` : '') + (r.length > 1 ? t('wingline.res.tries', r.length) : '')))
      if (x.outcome) add(d, el('details', { class: 'dsec tech' }, el('summary', null, t('wingline.det.report')), el('div', { class: 'box' }, el('div', { class: 'outc full' }, lastSum(x) || x.outcome))))
    }
    const typ = ST[x.role]
    const tech = el('details', { class: 'tech' }, el('summary', null, t('wingline.det.tech')))
    add(tech, el('div', { class: 'dsec' }, el('h3', null, t('wingline.det.facts')), el('div', { class: 'box' }, el('dl', { class: 'facts' },
      el('dt', null, t('wingline.det.id')), el('dd', { class: 'mono' }, x.id),
      el('dt', null, t('wingline.det.agent')), el('dd', null, `${x.assignee || '—'} · ${x.role}`),
      el('dt', null, t('wingline.det.created')), el('dd', null, `${dhm(x.created)} (${ago(now() - x.created)})`),
      el('dt', null, t('wingline.det.limit')), el('dd', null, x.maxrt ? dur(x.maxrt) : t('wingline.det.none')),
      el('dt', null, t('wingline.det.retries')), el('dd', null, x.retries != null ? String(x.retries) : t('wingline.det.dflt')),
      el('dt', null, t('wingline.det.cost')), el('dd', null, usd(x.usd) + (x.usdKind === 'estimated' ? t('wingline.det.estimated') : '')),
      el('dt', null, t('wingline.det.typical', x.role)), el('dd', null, typ ? t('wingline.det.typicalVal', Math.max(1, Math.round(typ.p50 / 60)), usd(typ.usd), typ.n) : t('wingline.det.noTypical', x.role))))))
    const runs = el('div', { class: 'dsec' }, el('h3', null, t('wingline.det.attempts', x.runs.length)))
    x.runs.slice().reverse().forEach((r, i) => {
      const n = x.runs.length - i
      const key = x.id + n
      const open = S.runOpen[key] ?? i === 0
      const o = r.e ? r.o : 'running'
      if (S.at != null && r.s > now()) return
      runs.append(el('div', { class: `run${open ? ' open' : ''}` }, el('button', { onclick: () => { S.runOpen[key] = !open; renderDrawer() } }, el('span', { class: 'mono dim' }, `#${n}`), el('span', null, r.e ? t('wingline.det.worked', dur(r.e - r.s)) : t('wingline.det.workingFor', dur(now() - r.s)), el('span', { class: 'when' }, dhm(r.s) + (r.e ? `–${hm(r.e)}` : ''))), el('span', { class: `o ${o}` }, outWord(o)), icon('chev', 12)),
        el('div', { class: 'rb' }, r.err ? el('div', { class: 'rerr' }, r.err) : null, r.sum || (r.e ? t('wingline.det.noSummary') : t('wingline.det.stillWorking')))))
    })
    if (!x.runs.length) runs.append(el('div', { class: 'role' }, t('wingline.det.noAttempts')))
    add(tech, runs, logBlock(x))
    add(d, tech)
    return d
  }
  function logBlock(x) {
    const L = S.log && S.log.id === x.id ? S.log : null
    const box = el('div', { class: 'dsec', 'data-log': x.id }, el('h3', null, t('wingline.log.title')))
    if (!L) {
      box.append(el('button', { class: 'btn', 'data-act': 'log', onclick: () => openLog(x) }, t('wingline.log.open')))
      return box
    }
    const body = L.loading ? t('wingline.log.loading') : L.error ? t('wingline.log.failed', L.error) : !L.exists ? t('wingline.log.none') : null
    add(box, el('div', { class: 'box' }, body || [L.truncated && el('div', { class: 'role' }, t('wingline.log.trunc')), el('pre', { class: 'logpre' }, L.content || t('wingline.log.empty'))]),
      el('div', { class: 'acts' }, el('button', { class: 'btn', 'data-act': 'log-close', onclick: () => { S.log = null; redetail() } }, t('wingline.log.hide'))))
    return box
  }
  function redetail() {
    if (S.view === 'inbox') render()
    else renderDrawer()
  }
  async function openLog(x) {
    S.log = { id: x.id, loading: true }
    redetail()
    try {
      const res = await kanbanCall(`/tasks/${enc(x.id)}/log?tail=${LOG_TAIL}`, x.board)
      S.log = { id: x.id, loading: false, exists: res?.exists !== false, content: stripAnsi(res?.content || ''), truncated: !!res?.truncated }
    } catch (err) {
      console.warn(`[${ID}] reading the log of ${x.id} failed`, err)
      S.log = { id: x.id, loading: false, error: errText(err) }
    }
    if (!dead && S.log && S.log.id === x.id) redetail()
  }
  function openDrawer(id) {
    if (!BY[id]) return
    if (S.open !== id) S.log = null
    S.open = id
    renderDrawer()
    $('.drawer').classList.add('on')
  }
  function closeDrawer() {
    S.open = null
    $('.drawer')?.classList.remove('on')
  }
  function renderDrawer() {
    const dr = $('.drawer')
    if (!S.open || !BY[S.open]) return
    const scroll = dr.querySelector('.dbody')?.scrollTop || 0
    dr.replaceChildren(el('div', { class: 'dhead' }, el('span', { class: 'role' }, t('wingline.det.task')), el('span', { class: 'kbd' }, t('wingline.det.move')), el('button', { class: 'x', 'data-act': 'close', onclick: closeDrawer, title: t('wingline.det.close') }, icon('x'))), el('div', { class: 'dbody' }, detail(BY[S.open])))
    dr.querySelector('.dbody').scrollTop = scroll
  }

  function boardEvents() {
    const ev = []
    for (const x of T.filter(y => y.board === S.board)) {
      for (const r of x.runs) {
        ev.push({ ts: r.s, c: 'gold', txt: [el('b', null, x.title), t('wingline.feed.started')] })
        if (r.e) ev.push({ ts: r.e, c: r.o === 'completed' ? 'green' : 'red', txt: [el('b', null, x.title), r.o === 'completed' ? t('wingline.feed.finished', dur(r.e - r.s)) : r.o === 'blocked' ? (x.role === 'gate' ? t('wingline.feed.approval') : t('wingline.feed.blocked')) : t('wingline.feed.ended', outWord(r.o), dur(r.e - r.s))], needs: r.o !== 'completed' })
      }
    }
    return ev.sort((a, b) => a.ts - b.ts)
  }
  function toggleReplay() {
    if (S.at == null) startReplay()
    else goLive()
  }
  function startReplay(range) {
    const bt = T.filter(x => x.board === S.board)
    if (!bt.length) return
    const first = Math.min(...bt.map(x => x.created))
    const recent = bt.some(x => x.runs.some(r => r.s > D.now - 86400))
    S.range = range || S.range || 86400
    if (!range && !recent) S.range = 'all'
    RANGE = [S.range === 'all' ? first - 600 : Math.max(first - 600, D.now - S.range), D.now]
    EV = boardEvents().filter(e => e.ts >= RANGE[0])
    S.at = RANGE[0]
    LAST = S.at
    S.playing = true
    S.noteFor = null
    closeDrawer()
    $('.feed').replaceChildren()
    render()
    renderBar()
    $('.rbar').classList.add('on')
  }
  function goLive() {
    S.at = null
    S.playing = false
    $('.rbar').classList.remove('on')
    $('.feed').replaceChildren()
    render()
  }
  function renderBar() {
    const bar = $('.rbar')
    bar.replaceChildren()
    const span = RANGE[1] - RANGE[0] || 1
    const X = ts => `${((ts - RANGE[0]) / span) * 100}%`
    const tr = el('div', { class: 'track' }, el('div', { class: 'ln' }), el('div', { class: 'pr' }))
    for (const e of EV) if (e.c !== 'green' || EV.length < 120) tr.append(el('i', { class: `ev ${e.needs ? 'red' : e.c === 'gold' ? 'gold' : ''}`, style: `left:${X(e.ts)}` }))
    const step = span > 3 * 86400 ? 86400 : span > 12 * 3600 ? 6 * 3600 : 3 * 3600
    for (let x = Math.ceil(RANGE[0] / step) * step; x < RANGE[1]; x += step) tr.append(el('span', { class: 'hr', style: `left:${X(x)}` }, step >= 86400 || new Date(x * 1000).getHours() === 0 ? new Date(x * 1000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : hm(x)))
    tr.append(el('i', { class: 'th' }))
    const seek = e => {
      const r = tr.getBoundingClientRect()
      S.at = RANGE[0] + Math.max(0, Math.min(1, (e.clientX - r.left) / (r.width || 1))) * span
      LAST = S.at
      $('.feed').replaceChildren()
      render()
      tickBar()
    }
    tr.addEventListener('pointerdown', e => {
      seek(e)
      const mv = ev => seek(ev)
      window.addEventListener('pointermove', mv)
      window.addEventListener('pointerup', () => window.removeEventListener('pointermove', mv), { once: true })
    })
    const rng = el('div', { class: 'rng' }, [[86400, 'range24'], [3 * 86400, 'range3'], [7 * 86400, 'range7'], ['all', 'rangeAll']].map(([v, k]) => el('button', { class: S.range === v ? 'on' : '', onclick: () => startReplay(v) }, t(`wingline.replay.${k}`))))
    const spd = el('div', { class: 'rng' }, [[600, 's10'], [1800, 's30'], [7200, 's2h']].map(([v, k]) => el('button', { class: S.speed === v ? 'on' : '', 'data-speed': v, onclick: () => { S.speed = v; renderBar() } }, t(`wingline.replay.${k}`))))
    bar.append(el('button', { class: 'play', 'data-act': 'play', onclick: () => { S.playing = !S.playing; if (S.at >= RANGE[1]) { S.at = RANGE[0]; LAST = S.at } renderBar() }, title: t('wingline.replay.play') }, icon(S.playing ? 'pause' : 'play', 15)), el('span', { class: 'rt' }), tr, el('div', { class: 'rgrp' }, rng, spd), el('button', { class: 'btn go', 'data-act': 'live', onclick: goLive }, t('wingline.top.goLive'), el('span', { class: 'kbd' }, 'Esc')))
    tickBar()
  }
  function tickBar() {
    if (S.at == null) return
    const p = ((S.at - RANGE[0]) / (RANGE[1] - RANGE[0] || 1)) * 100
    const th = $('.rbar .th')
    if (!th) return
    th.style.left = `${p}%`
    $('.rbar .pr').style.width = `${p}%`
    $('.rbar .rt').textContent = `${new Date(S.at * 1000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} ${hm(S.at)}`
  }
  function feed(e) {
    const box = $('.feed')
    const n = el('div', { class: `fe ${e.needs ? 'red' : e.c}` }, el('span', { class: 'tm' }, hm(e.ts)), el('span', null, e.txt.map(z => (z.nodeType ? z.cloneNode(true) : z))))
    box.prepend(n)
    while (box.children.length > 4) box.lastChild.remove()
    later(() => {
      n.style.opacity = 0
      later(() => n.remove(), 600)
    }, 5200)
  }
  const replaySig = () => T.filter(x => x.board === S.board || state(x).k === 'working' || state(x).k === 'needs').map(x => x.id + state(x).k).join()
  const dataSig = () => (D ? JSON.stringify([D.boards.map(b => b.slug), T.map(x => [x.id, x.status, x.runs.length, x.runs[x.runs.length - 1]?.o, x.runs[x.runs.length - 1]?.e, x.comments, x.story?.cause, x.story?.tl?.length, x.story?.facts?.resetPassed]), Object.keys(OV)]) : '')

  function renderView(anim) {
    const v = $('.view')
    if (S.view === 'board') renderBoard(v, anim)
    else if (S.view === 'list') renderList(v)
    else renderInbox(v)
  }
  function render(anim) {
    if (dead || !D) return
    DIRTY = false
    root.querySelector('.wl-app').classList.toggle('norail', !S.rail)
    renderRail()
    renderTop()
    renderView(anim)
    if (S.open) renderDrawer()
    RSIG = replaySig()
    SIG = dataSig()
  }
  function renderState() {
    const v = $('.view')
    if (D) return
    v.replaceChildren(LOADERR ? el('div', { class: 'wl-state', role: 'alert' }, LOADERR, el('button', { class: 'btn', 'data-act': 'reload', onclick: load }, t('wingline.tryAgain'))) : el('div', { class: 'wl-state', role: 'status' }, t('wingline.loading')))
  }
  function patchLive() {
    for (const x of T) {
      if (x.act && S.at == null) $$(`[data-live="${attr(x.id)}"]`).forEach(n => { n.textContent = n.closest('.agent') || n.classList.contains('s2') ? `▸ ${plainAct(x.act.text)}` : plainAct(x.act.text) })
      $$(`[data-usd="${attr(x.id)}"]`).forEach(n => { n.textContent = `${x.usdKind === 'estimated' ? '≈ ' : ''}${usd(x.usd)}` })
      if (S.check === x.id) $$(`[data-check="${attr(x.id)}"]`).forEach(n => { n.textContent = checkText(x).text })
    }
    const up = $('[data-updated]')
    if (up) up.textContent = t('wingline.rail.live', hm(Date.now() / 1000, 1))
  }
  const busy = () => !!(S.noteFor || DRAG || S.at != null || S.dlg || $('.scrim')?.classList.contains('on') || (root.contains(document.activeElement) && /INPUT|TEXTAREA/.test(document.activeElement.tagName)))

  function frame(ts) {
    if (dead) return
    const dt = Math.min(0.25, (ts - (frame.last || ts)) / 1000)
    frame.last = ts
    if (S.at != null && S.playing && !DRAG) {
      S.at = Math.min(RANGE[1], S.at + dt * S.speed)
      for (const e of EV) {
        if (e.ts > LAST && e.ts <= S.at) {
          feed(e)
          if (e.needs) toast([el('b', { class: 'redt' }, t('wingline.feed.needs')), ...e.txt.map(z => (z.nodeType ? z.cloneNode(true) : z))], null, true)
        }
      }
      LAST = S.at
      if (S.at >= RANGE[1]) {
        S.playing = false
        renderBar()
      }
      if (replaySig() !== RSIG) render()
      tickBar()
      tickTimes()
    }
    raf = window.requestAnimationFrame(frame)
  }
  function tickTimes() {
    const n = now()
    $$('[data-since]').forEach(e => {
      const s = +e.dataset.since
      if (s) e.textContent = dur(n - s)
    })
    $$('[data-bar]').forEach(e => {
      const elapsed = n - e.dataset.bar
      const typ = stat(e.dataset.role)
      const max = +e.dataset.max
      const top = typ ? typ.p90 * 1.1 : max || 3600
      e.firstChild.style.width = `${Math.min(100, (elapsed / top) * 100)}%`
      e.classList.toggle('over', !!max && elapsed > max)
    })
    $$('[data-barl]').forEach(e => {
      const elapsed = n - e.dataset.barl
      const max = +e.dataset.max
      e.replaceChildren(...barLabel(e.dataset.role, elapsed, max))
      e.classList.toggle('over', !!max && elapsed > max)
    })
    $$('[data-ago]').forEach(e => {
      e.textContent = t('wingline.det.lastUpdate', ago(n - e.dataset.ago))
    })
    const c = $('[data-clock]')
    if (c) c.textContent = hm(n, 1)
  }
  function tick() {
    if (S.at != null) return
    tickTimes()
    if (DIRTY && !busy()) render()
  }

  function setBoard(b) {
    if (S.board === b) return
    S.board = b
    writeStore('board', b)
    S.sel = null
    doneLimit = DONE_PAGE
    S.q = ''
    const q = $('#wl-q')
    if (q) q.value = ''
    if (S.at != null) goLive()
    closeDrawer()
    render('enter')
  }
  function setView(v) {
    S.view = v
    if (v !== 'inbox') {
      const sel = S.sel && BY[S.sel.slice(2)]
      if (sel && sel.board !== S.board) S.board = sel.board
    }
    closeDrawer()
    render(v === 'board' ? 'enter' : null)
  }
  function select(k) {
    S.sel = k
    $$('[data-nav]').forEach(e => e.classList.toggle('sel', e.dataset.nav === k))
    const n = $$('[data-nav]').find(e => e.dataset.nav === k)
    if (n && typeof n.scrollIntoView === 'function') n.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
  function move(dir) {
    const ns = $$('.view [data-nav]').filter(e => e.offsetParent !== null)
    if (!ns.length) return
    let i = ns.findIndex(e => e.dataset.nav === S.sel)
    if (dir === 'down' || dir === 'up') i = i < 0 ? 0 : Math.max(0, Math.min(ns.length - 1, i + (dir === 'down' ? 1 : -1)))
    else {
      const cur = ns[i] || ns[0]
      const cc = cur.closest('.col')
      const cols = $$('.col').filter(c => !c.classList.contains('empty'))
      const ci = cols.indexOf(cc) + (dir === 'right' ? 1 : -1)
      if (!cc || !cols[ci]) return
      const y = cur.getBoundingClientRect().top
      const cand = ns.filter(e => e.closest('.col') === cols[ci])
      if (!cand.length) return
      i = ns.indexOf(cand.reduce((a, b) => (Math.abs(b.getBoundingClientRect().top - y) < Math.abs(a.getBoundingClientRect().top - y) ? b : a)))
    }
    const k = ns[i].dataset.nav
    if (S.view === 'inbox') {
      S.sel = k
      render()
      return
    }
    select(k)
    if (S.open && k.startsWith('t:')) openDrawer(k.slice(2))
  }

  function cmds() {
    const sel = S.sel && S.sel.startsWith('t:') ? BY[S.sel.slice(2)] : null
    const c = [
      [t('wingline.pal.goBoard'), t('wingline.pal.catView'), '1', () => setView('board')],
      [t('wingline.pal.goList'), t('wingline.pal.catView'), '2', () => setView('list')],
      [t('wingline.pal.goInbox'), t('wingline.pal.catView'), '3', () => setView('inbox')],
      [S.at == null ? t('wingline.pal.replay') : t('wingline.pal.live'), t('wingline.pal.catTime'), 'R', toggleReplay],
      [t('wingline.pal.help'), t('wingline.pal.catHelp'), '?', openHelp],
      [t('wingline.pal.rail'), t('wingline.pal.catView'), '[', toggleRail]
    ]
    if (sel && state(sel).k === 'needs' && causeOf(sel) && !['review', 'asks_you'].includes(causeOf(sel))) c.unshift([t('wingline.pal.again', label(sel)), t('wingline.pal.catAction'), 'Q', () => { if (S.view !== 'board') setView('board'); openNote(sel.id, 'again') }], [t('wingline.pal.remove', label(sel)), t('wingline.pal.catAction'), '', () => remove(sel.id)])
    if (sel) c.unshift([t('wingline.pal.open', label(sel)), t('wingline.pal.catAction'), '↵', () => openDrawer(sel.id)])
    for (const b of D.boards) c.push([t('wingline.pal.board', b.name), t('wingline.pal.catBoard'), '', () => setBoard(b.slug), null, 'board'])
    for (const x of T) {
      const s = state(x)
      if (s.k !== 'gone') c.push([x.title, `${t(`wingline.pill.${s.k}`)} · ${boardName(x.board)}`, '', () => { setBoard(x.board); if (S.view === 'inbox') setView('board'); select(`t:${x.id}`); openDrawer(x.id) }, s.k, 'task'])
    }
    return c
  }
  function score(q, s) {
    if (!q) return 1
    s = s.toLowerCase()
    q = q.toLowerCase()
    const i = s.indexOf(q)
    if (i >= 0) return 100 - i
    let j = 0
    for (const ch of s) if (ch === q[j]) j++
    return j === q.length ? 10 : 0
  }
  function openPalette() {
    const sc = $('.scrim')
    sc.replaceChildren()
    sc.classList.add('on')
    PI = 0
    const sel = S.sel && S.sel.startsWith('t:') ? BY[S.sel.slice(2)] : null
    const inp = el('input', { placeholder: t('wingline.pal.placeholder'), 'aria-label': t('wingline.pal.placeholder') })
    const res = el('div', { class: 'pres', role: 'listbox' })
    let list = []
    const run = c => {
      closeScrim()
      c[3]()
    }
    const draw = () => {
      const q = inp.value.trim()
      const all = cmds().map(c => [score(q, `${c[0]} ${c[1]}`), c]).filter(x => x[0] > 0)
      if (!q) all.splice(14)
      all.sort((a, b) => b[0] - a[0])
      list = all.slice(0, 40).map(x => x[1])
      PI = Math.max(0, Math.min(PI, list.length - 1))
      res.replaceChildren()
      let g = null
      list.forEach((c, i) => {
        const grp = c[5] === 'task' ? t('wingline.pal.tasks') : c[5] === 'board' ? t('wingline.pal.boards') : t('wingline.pal.commands')
        if (grp !== g && q === '') {
          g = grp
          res.append(el('div', { class: 'pg' }, grp))
        }
        const dot = c[4] ? el('i', { class: `sd ${c[4]}` }) : icon(c[5] === 'board' ? 'board' : 'bolt', 14)
        res.append(el('button', { class: `pi${i === PI ? ' on' : ''}`, role: 'option', onmouseenter: () => { PI = i; draw() }, onclick: () => run(c) }, dot, el('span', null, c[0], el('span', { class: 's' }, c[5] === 'task' ? c[1] : '')), c[2] ? el('span', { class: 'kbd' }, c[2]) : el('span')))
      })
    }
    inp.addEventListener('input', () => {
      PI = 0
      draw()
    })
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        PI = Math.min(PI + 1, list.length - 1)
        draw()
        e.preventDefault()
      }
      if (e.key === 'ArrowUp') {
        PI = Math.max(PI - 1, 0)
        draw()
        e.preventDefault()
      }
      if (e.key === 'Enter' && list[PI]) run(list[PI])
      if (e.key === 'Escape') closeScrim()
      e.stopPropagation()
    })
    sc.append(el('div', { class: 'pal', role: 'dialog', onclick: e => e.stopPropagation() }, sel && el('span', { class: 'ctx' }, t('wingline.pal.selected', sel.title)), inp, res))
    draw()
    later(() => inp.focus(), 10)
  }
  function openHelp() {
    const sc = $('.scrim')
    sc.replaceChildren()
    sc.classList.add('on')
    const K = [['search', '/'], ['filter', 'F'], ['move', 'J K ← →'], ['open', 'Enter'], ['close', 'Esc'], ['again', 'Q'], ['undo', 'Ctrl Z'], ['views', '1 2 3'], ['replay', 'R'], ['play', 'Space'], ['rail', '['], ['help', '?']]
    sc.append(el('div', { class: 'help', role: 'dialog', onclick: e => e.stopPropagation() }, el('h3', null, t('wingline.keys.title')), K.map(([a, b]) => el('div', null, t(`wingline.keys.${a}`), el('span', { class: 'kbd' }, b)))))
  }
  function closeScrim() {
    if (S.dlg && S.dlg.phase === 'running') return
    S.dlg = null
    $('.scrim').classList.remove('on')
    root.querySelector('.wl-app').focus()
  }
  function toggleRail() {
    S.rail = !S.rail
    root.querySelector('.wl-app').classList.toggle('norail', !S.rail)
  }
  function onKey(e) {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName) && root.contains(document.activeElement)
    const scrim = $('.scrim').classList.contains('on')
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !typing && UNDO.length) {
      e.preventDefault()
      undo()
      return
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (e.key === 'Escape') {
      if (scrim) closeScrim()
      else if (typing) document.activeElement.blur()
      else if (S.open) closeDrawer()
      else if (S.at != null) goLive()
      else return
      e.stopPropagation()
      return
    }
    if (typing || scrim || !D) return
    const k = e.key
    const sel = S.sel?.startsWith('t:') ? BY[S.sel.slice(2)] : null
    const handled = () => {
      e.preventDefault()
      e.stopPropagation()
    }
    if (k === '/') {
      handled()
      openPalette()
    } else if (k === 'f') {
      handled()
      $('#wl-q')?.focus()
    } else if (k === 'j' || k === 'ArrowDown') {
      handled()
      move('down')
    } else if (k === 'k' || k === 'ArrowUp') {
      handled()
      move('up')
    } else if (k === 'l' || k === 'ArrowRight') {
      handled()
      move('right')
    } else if (k === 'h' || k === 'ArrowLeft') {
      handled()
      move('left')
    } else if (k === 'Enter' && S.sel) {
      handled()
      if (S.sel.startsWith('g:')) {
        S.groupOpen[S.sel.slice(2)] = !S.groupOpen[S.sel.slice(2)]
        render()
      } else openDrawer(S.sel.slice(2))
    } else if (k === '1' || k === '2' || k === '3') {
      handled()
      setView(['board', 'list', 'inbox'][+k - 1])
    } else if (k === 'r') {
      handled()
      toggleReplay()
    } else if (k === ' ' && S.at != null) {
      handled()
      S.playing = !S.playing
      renderBar()
    } else if (k === '[') {
      handled()
      toggleRail()
    } else if (k === '?') {
      handled()
      openHelp()
    } else if (k === 'q' && sel && state(sel).k === 'needs' && S.at == null) {
      const c = causeOf(sel)
      if (!c || c === 'review') return
      handled()
      if (S.view !== 'board' && !S.open) setView('board')
      openNote(sel.id, c === 'asks_you' ? 'reply' : 'again')
    }
  }

  async function load() {
    const mine = ++seq
    try {
      if (typeof env.rest !== 'function') throw new Error(t('wingline.err.noRest'))
      const d = await env.rest('/app')
      if (mine !== seq || dead) return
      if (!d || !Array.isArray(d.tasks) || !Array.isArray(d.boards)) throw new Error(t('wingline.err.shape'))
      LOADERR = null
      const first = !D
      setData(d)
      if (first) {
        if (!S.board) {
          const lead = needsAll()[0] || T.find(x => x.status === 'running')
          S.board = lead ? lead.board : D.boards[0]?.slug || null
        }
        if (!D.boards.length) {
          $('.view').replaceChildren(el('div', { class: 'wl-state' }, t('wingline.empty')))
          return
        }
        render('enter')
        return
      }
      if (!D.boards.length) return
      if (S.open && !BY[S.open]) closeDrawer()
      if (dataSig() !== SIG) {
        if (busy()) {
          DIRTY = true
          patchLive()
        } else render()
      } else patchLive()
    } catch (err) {
      if (mine !== seq || dead) return
      console.warn(`[${ID}] reading /app failed`, err)
      LOADERR = errText(err)
      if (!D) renderState()
      else renderRail()
    }
  }

  const app = el('div', { class: 'wl-app', tabindex: -1, onkeydown: onKey },
    el('aside', { class: 'rail' }),
    el('main', { class: 'main' }, el('header', { class: 'tbar' }), el('section', { class: 'view' }), el('div', { class: 'feed' }), el('div', { class: 'rbar' }), el('aside', { class: 'drawer' })),
    el('div', { class: 'scrim', onclick: closeScrim }),
    el('div', { class: 'wl-toasts' }))
  root.append(app)
  renderState()
  load()
  const poll = window.setInterval(() => {
    if (document.visibilityState !== 'hidden') load()
  }, POLL_MS)
  const clock = window.setInterval(tick, 1000)
  const onVis = () => {
    if (document.visibilityState === 'visible') load()
  }
  document.addEventListener('visibilitychange', onVis)
  raf = window.requestAnimationFrame(frame)
  later(() => app.focus({ preventScroll: true }), 50)

  return {
    destroy() {
      dead = true
      window.clearInterval(poll)
      window.clearInterval(clock)
      window.cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', dragMove)
      for (const id of timers) window.clearTimeout(id)
      for (const id of Object.keys(PENDING)) commitRemove(id)
      app.remove()
    },
    refresh: load
  }
}

const MIX = (c, p, base = 'transparent') => `color-mix(in srgb, ${c} ${p}%, ${base})`
const BG = 'var(--ui-bg-chrome)'
const PANEL = MIX('var(--ui-base)', 4, BG)
const PANEL2 = MIX('var(--ui-base)', 7, BG)
const RAIL = MIX('var(--ui-base)', 2, BG)
const LINE = 'var(--ui-stroke-tertiary)'
const LINE2 = 'var(--ui-stroke-secondary)'
const INK = 'var(--ui-text-primary)'
const LAB = 'var(--ui-text-secondary)'
const DIM = 'var(--ui-text-tertiary)'
const GOLD = 'var(--ui-yellow)'
const RED = 'var(--ui-red)'
const GREEN = 'var(--ui-green)'
const BLUE = 'var(--ui-blue)'
const PINK = MIX(RED, 45, INK)
const MINT = MIX(GREEN, 40, INK)
const SHADOW = MIX('black', 45)
const EASE = 'cubic-bezier(.2,.8,.2,1)'
const MONO = "'JetBrains Mono',ui-monospace,Consolas,monospace"
const HEAD = "Collapse,'Segoe UI',system-ui,sans-serif"

const STYLE = `
.wl-host{position:relative;height:100%;min-height:480px;overflow:hidden}
.wl-app{position:absolute;inset:0;display:grid;grid-template-columns:232px 1fr;background:${BG};color:${INK};font-size:13px;line-height:1.45;font-variant-numeric:tabular-nums;overflow:hidden;outline:none;transition:grid-template-columns .28s ${EASE}}
.wl-app.norail{grid-template-columns:0 1fr}
.wl-app *{box-sizing:border-box}
.wl-app button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.wl-app button:disabled{opacity:.5;cursor:default}
.wl-app button:focus-visible,.wl-app input:focus-visible,.wl-app textarea:focus-visible,.wl-app [data-nav]:focus-visible{outline:2px solid ${GOLD};outline-offset:2px}
.wl-app .mono{font-family:${MONO}}
.wl-app .dim{color:${DIM};font-size:12px}
.wl-app .rt{text-align:right;font-size:12px}
.wl-app .kbd{font:11px/1 ${MONO};color:${DIM};border:1px solid ${LINE2};border-radius:5px;padding:3px 5px;white-space:nowrap}
.wl-app .spin{width:12px;height:12px;border-radius:50%;border:2px solid ${MIX(GOLD, 20)};border-top-color:${GOLD};animation:wl-spin .9s linear infinite;flex:none}
.wl-app .spin.sm{width:10px;height:10px}
@keyframes wl-spin{to{transform:rotate(360deg)}}
.wl-app .rail{background:${RAIL};border-right:1px solid ${LINE};display:flex;flex-direction:column;min-width:0;overflow:hidden}
.wl-app .brand{display:flex;align-items:center;gap:10px;padding:16px 14px 12px}
.wl-app .brand .logo{width:22px;height:22px;border-radius:7px;background:conic-gradient(from 200deg,${GOLD},${MIX(GOLD, 55, INK)},${GOLD});display:grid;place-items:center;color:${BG};font:700 13px/1 ${HEAD}}
.wl-app .brand b{font:700 17px/1 ${HEAD};letter-spacing:.01em}
.wl-app .brand .kbtn{margin-left:auto;display:flex;align-items:center;gap:6px;color:${LAB};font-size:12px;padding:5px 7px;border-radius:7px}
.wl-app .brand .kbtn:hover{background:${PANEL2}}
.wl-app .attn{margin:2px 10px 10px;display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;background:${MIX(RED, 15)};color:${PINK};font-weight:600;text-align:left}
.wl-app .attn.zero{background:${PANEL};color:${LAB};font-weight:500}
.wl-app .attn .dot{width:8px;height:8px;border-radius:50%;background:${RED};animation:wl-ping 2s infinite}
.wl-app .attn.zero .dot{background:${GREEN};animation:none}
.wl-app .attn .n{margin-left:auto;font:600 12px ${MONO}}
@keyframes wl-ping{0%{box-shadow:0 0 0 0 ${MIX(RED, 60)}}70%{box-shadow:0 0 0 8px ${MIX(RED, 0)}}100%{box-shadow:0 0 0 0 ${MIX(RED, 0)}}}
.wl-app .sec{padding:10px 14px 6px;color:${DIM};font-size:11px;letter-spacing:.08em;text-transform:uppercase;display:flex;justify-content:space-between}
.wl-app .boards{padding:0 6px;display:flex;flex-direction:column;gap:1px}
.wl-app .brow{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:7px 8px;border-radius:8px;text-align:left;align-items:center}
.wl-app .brow:hover{background:${PANEL}}
.wl-app .brow.on{background:${PANEL2}}
.wl-app .brow .nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:550}
.wl-app .brow.quiet .nm{color:${LAB};font-weight:450}
.wl-app .brow .bd{font:11px ${MONO};color:${DIM}}
.wl-app .brow .bd.red{color:${BG};background:${RED};border-radius:9px;padding:1px 6px;font-weight:700}
.wl-app .seg{grid-column:1 / -1;display:flex;height:3px;border-radius:3px;overflow:hidden;background:${PANEL2};gap:1px}
.wl-app .seg i{display:block;height:100%}
.wl-app .agents{padding:0 6px;display:flex;flex-direction:column;gap:2px;overflow:auto}
.wl-app .agent{display:grid;grid-template-columns:14px 1fr auto;gap:0 8px;padding:7px 8px;border-radius:8px;text-align:left;align-items:center}
.wl-app .agent:hover{background:${PANEL}}
.wl-app .agent .t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:550}
.wl-app .agent .a{grid-column:2 / -1;font:11px/1.35 ${MONO};color:${LAB};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-app .agent .tm{font:11px ${MONO};color:${GOLD}}
.wl-app .agent.none{color:${DIM};grid-template-columns:1fr;font-size:12px}
.wl-app .rfoot{margin-top:auto;padding:12px 14px;color:${DIM};font-size:11px;border-top:1px solid ${LINE};line-height:1.5}
.wl-app .probs{margin-top:6px;color:${PINK};word-break:break-word}
.wl-app .main{display:flex;flex-direction:column;min-width:0;min-height:0;position:relative}
.wl-app .tbar{display:flex;align-items:center;gap:14px;padding:14px 20px 12px;border-bottom:1px solid ${LINE};min-width:0}
.wl-app .tbar h1{margin:0;font:700 24px/1 ${HEAD};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.wl-app .meta{color:${LAB};font-size:12px;white-space:nowrap}
.wl-app .tabs{display:flex;gap:2px;background:${PANEL};border:1px solid ${LINE};border-radius:9px;padding:2px;margin-left:8px}
.wl-app .tabs button{padding:5px 11px;border-radius:7px;color:${LAB};font-weight:550;display:flex;gap:7px;align-items:center}
.wl-app .tabs button.on{background:${PANEL2};color:${INK};box-shadow:inset 0 0 0 1px ${LINE2}}
.wl-app .tabs .c{font:11px ${MONO};color:${DIM}}
.wl-app .tabs .c.red{color:${RED}}
.wl-app .search{margin-left:auto;display:flex;align-items:center;gap:8px;background:${PANEL};border:1px solid ${LINE};border-radius:9px;padding:0 9px;height:32px;width:220px;transition:width .25s ${EASE},border-color .2s}
.wl-app .search:focus-within{width:300px;border-color:${LINE2}}
.wl-app .search input{flex:1;background:none;border:0;outline:0;color:${INK};font:inherit;min-width:0}
.wl-app .search svg{flex:none;opacity:.6}
.wl-app .live{display:flex;align-items:center;gap:8px;padding:6px 11px;border-radius:9px;border:1px solid ${LINE};color:${LAB};font:12px ${MONO};white-space:nowrap}
.wl-app .live i{width:7px;height:7px;border-radius:50%;background:${GREEN};box-shadow:0 0 0 3px ${MIX(GREEN, 15)}}
.wl-app .live.rp i{background:${GOLD};box-shadow:0 0 0 3px ${MIX(GOLD, 20)}}
.wl-app .rbtn{display:flex;align-items:center;gap:7px;padding:6px 11px;border-radius:9px;background:${PANEL2};border:1px solid ${LINE2};font-weight:600;white-space:nowrap}
.wl-app .view{flex:1;min-height:0;position:relative}
.wl-app .wl-state{display:grid;place-items:center;gap:10px;height:100%;color:${LAB};text-align:center;padding:40px}
.wl-app .board{position:absolute;inset:0;display:flex;gap:12px;padding:16px 20px 20px;overflow:auto}
.wl-app .col{flex:1 1 0;min-width:258px;max-width:380px;display:flex;flex-direction:column;border-radius:14px;transition:flex .35s ${EASE},min-width .35s ${EASE},background .2s,box-shadow .2s}
.wl-app .col.empty{flex:0 0 46px;min-width:46px}
.wl-app .col.drop{background:${MIX(GOLD, 6)};box-shadow:inset 0 0 0 1.5px ${MIX(GOLD, 40)}}
.wl-app .col.nodrop{box-shadow:inset 0 0 0 1.5px ${MIX(RED, 30)}}
.wl-app .chead{display:flex;align-items:center;gap:8px;padding:4px 6px 10px;white-space:nowrap}
.wl-app .chead .gl{width:9px;height:9px;border-radius:50%}
.wl-app .chead b{font-weight:650}
.wl-app .chead .n{font:12px ${MONO};color:${DIM}}
.wl-app .chead .sum{margin-left:auto;font:11px ${MONO};color:${DIM}}
.wl-app .col.empty .chead{writing-mode:vertical-rl;padding:8px 12px;gap:10px}
.wl-app .col.empty .chead .sum,.wl-app .col.empty .cards{display:none}
.wl-app .cards{display:flex;flex-direction:column;gap:8px;overflow-y:auto;overflow-x:hidden;padding:2px 4px 30px;margin:0 -4px;flex:1}
.wl-app .more{color:${LAB};font-size:12px;padding:6px 8px;text-align:left;border-radius:8px}
.wl-app .more:hover{background:${PANEL}}
.wl-app .card{position:relative;background:${PANEL};border:1px solid ${LINE};border-radius:12px;padding:11px 12px 10px;cursor:default;user-select:none;transition:opacity .2s,border-color .15s,background .15s,transform .15s;touch-action:none;isolation:isolate}
.wl-app .card:hover{border-color:${LINE2}}
.wl-app .card.sel{border-color:${GOLD};box-shadow:0 0 0 3px ${MIX(GOLD, 15)}}
.wl-app .card.needs{background:linear-gradient(180deg,${MIX(RED, 12, BG)},${MIX(RED, 6, BG)});border-color:${MIX(RED, 35, BG)}}
.wl-app .card.needs.sel{border-color:${RED};box-shadow:0 0 0 3px ${MIX(RED, 18)}}
.wl-app .card.working{border-color:${MIX(GOLD, 30, BG)};overflow:hidden}
.wl-app .card.working::before{content:"";position:absolute;inset:-60%;background:conic-gradient(transparent 0 70%,${GOLD} 85%,transparent 100%);animation:wl-spin 3s linear infinite;z-index:-2;pointer-events:none}
.wl-app .card.working::after{content:"";position:absolute;inset:1px;border-radius:11px;background:${PANEL};z-index:-1;pointer-events:none}
.wl-app .card.dragging{opacity:.28}
.wl-app .shake{animation:wl-shake .38s}
@keyframes wl-shake{20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
.wl-app .board.hov .card,.wl-app .board.hov .srow{opacity:.32}
.wl-app .board.hov .card.hl,.wl-app .board.hov .srow.hl{opacity:1}
.wl-app .ctop{display:flex;align-items:center;gap:7px;font-size:11.5px;color:${LAB};min-width:0}
.wl-app .pchip{display:inline-flex;align-items:center;gap:6px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-app .pchip i{width:7px;height:7px;border-radius:2px;flex:none}
.wl-app .age{margin-left:auto;font:11px ${MONO};color:${DIM};white-space:nowrap}
.wl-app .card.needs .age{color:${RED}}
.wl-app .card.working .age{color:${GOLD}}
.wl-app .ctitle{font-weight:650;font-size:14.5px;margin:5px 0 2px;line-height:1.25;overflow-wrap:anywhere}
.wl-app .ctitle.row{display:flex;align-items:center;gap:6px;font-size:14px}
.wl-app .role{font-size:11px;color:${DIM}}
.wl-app .why{color:${PINK};font-size:12.5px;margin-top:6px;line-height:1.4;overflow-wrap:anywhere}
.wl-app .why.big{margin:0;font-size:13.5px}
.wl-app .acts{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}
.wl-app .btn{border:1px solid ${LINE2};border-radius:8px;padding:5px 10px;font-size:12px;font-weight:600;white-space:nowrap;background:${MIX(INK, 2)};transition:background .15s,border-color .15s,color .15s}
.wl-app .btn:hover{background:${MIX(INK, 6)}}
.wl-app .btn.go{background:${GOLD};border-color:${GOLD};color:${BG}}
.wl-app .btn.go:hover{filter:brightness(1.08)}
.wl-app .btn.no{color:${RED};border-color:${MIX(RED, 40, BG)}}
.wl-app .btn.arm{background:${RED};color:${BG};border-color:${RED}}
.wl-app .btn .kbd{margin-left:6px;border-color:${MIX(BG, 25)};color:inherit;opacity:.7;padding:1px 4px}
.wl-app .acts.big .btn{font-size:14px;padding:9px 16px}
.wl-app .note{display:flex;flex-direction:column;gap:6px;margin-top:8px}
.wl-app .note textarea{background:${BG};border:1px solid ${LINE2};border-radius:8px;color:${INK};font:inherit;padding:7px 9px;resize:none;height:60px;outline:0}
.wl-app .note textarea:focus{border-color:${GOLD}}
.wl-app .livel{display:flex;gap:8px;align-items:center;margin-top:7px;font:11.5px/1.35 ${MONO};color:${LAB};min-width:0}
.wl-app .livel span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-app .bar{height:4px;border-radius:4px;background:${MIX(GOLD, 14, BG)};margin-top:9px;overflow:hidden;position:relative}
.wl-app .bar i{position:absolute;inset:0 auto 0 0;background:${GOLD};border-radius:4px;transition:width .6s linear}
.wl-app .bar.over i{background:${RED}}
.wl-app .bar .typ{position:absolute;top:-2px;bottom:-2px;width:1px;background:${LAB}}
.wl-app .barl{display:flex;justify-content:space-between;font-size:11px;color:${DIM};margin-top:4px}
.wl-app .barl.over{color:${RED}}
.wl-app .wait{font-size:12px;color:${LAB};margin-top:5px}
.wl-app .wait.flat{margin:0}
.wl-app .wait b{color:${INK};font-weight:600}
.wl-app .cfoot{display:flex;gap:10px;align-items:center;margin-top:8px;font:11px ${MONO};color:${DIM}}
.wl-app .cfoot .usd{color:${LAB}}
.wl-app .srows{display:flex;flex-direction:column;gap:2px;margin-top:7px}
.wl-app .srow{display:grid;grid-template-columns:12px 1fr auto;gap:8px;align-items:center;padding:4px 6px;border-radius:7px;font-size:12.5px;transition:opacity .2s,background .15s}
.wl-app .srow:hover{background:${MIX(INK, 4)}}
.wl-app .srow.sel{background:${MIX(GOLD, 10)};box-shadow:inset 0 0 0 1px ${MIX(GOLD, 40)}}
.wl-app .srow .tm{font:11px ${MONO};color:${DIM}}
.wl-app .sd{width:8px;height:8px;border-radius:50%;border:1.5px solid ${DIM};display:inline-block;flex:none}
.wl-app .sd.working{border-color:${GOLD};border-top-color:transparent;animation:wl-spin .9s linear infinite}
.wl-app .sd.done{background:${DIM};border-color:${DIM}}
.wl-app .sd.needs{background:${RED};border-color:${RED}}
.wl-app .outc{color:${LAB};font-size:12.5px;margin-top:6px;line-height:1.4}
.wl-app .outc.full{margin:0;white-space:pre-wrap}
.wl-app .logpre{margin:0;max-height:300px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;font:11.5px/1.45 ${MONO};color:${LAB}}
.wl-app .chev{transition:transform .2s;flex:none}
.wl-app .card.open .chev{transform:rotate(90deg)}
.wl-app .pin{position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:5}
.wl-app .enter{animation:wl-enter .45s ${EASE} both}
@keyframes wl-enter{from{opacity:0;transform:translateY(8px) scale(.985)}}
.wl-app .flash{animation:wl-flash 1.2s ${EASE}}
@keyframes wl-flash{0%{box-shadow:0 0 0 0 ${MIX(GOLD, 65)}}100%{box-shadow:0 0 0 14px ${MIX(GOLD, 0)}}}
.wl-app .flash.red{animation:wl-flashr 1.2s ${EASE}}
@keyframes wl-flashr{0%{box-shadow:0 0 0 0 ${MIX(RED, 75)}}100%{box-shadow:0 0 0 14px ${MIX(RED, 0)}}}
.wl-app .ghost{position:fixed;z-index:60;pointer-events:none;transform:rotate(2deg) scale(1.03);box-shadow:0 18px 40px ${SHADOW},0 0 0 1px ${MIX(GOLD, 40)};transition:transform .12s}
.wl-app .ghost.back{transition:left .3s ${EASE},top .3s ${EASE},transform .3s,opacity .3s}
.wl-app .list{position:absolute;inset:0;overflow:auto;padding:12px 20px 40px}
.wl-app .lgrp{border-bottom:1px solid ${LINE}}
.wl-app .lhead{display:grid;grid-template-columns:18px 1fr auto auto 70px;gap:12px;align-items:center;width:100%;padding:12px 6px;text-align:left;border-radius:8px}
.wl-app .lhead:hover{background:${MIX(INK, 2)}}
.wl-app .lhead .sq{width:9px;height:9px;border-radius:3px}
.wl-app .lhead .nm{font-weight:650;font-size:14px}
.wl-app .lhead .st{font-size:12px;color:${LAB};margin-left:10px;font-weight:450}
.wl-app .lhead .st.red{color:${RED}}
.wl-app .lhead .st.gold{color:${GOLD}}
.wl-app .dots{display:flex;gap:3px;align-items:center}
.wl-app .dots i{width:9px;height:9px;border-radius:3px;background:${PANEL2}}
.wl-app .dots i.done{background:${DIM}}
.wl-app .dots i.working{background:${GOLD}}
.wl-app .dots i.needs{background:${RED}}
.wl-app .dots i.queued{background:transparent;box-shadow:inset 0 0 0 1.5px ${LINE2}}
.wl-app .lrow{display:grid;grid-template-columns:18px 200px 1fr 90px 70px 70px;gap:12px;align-items:center;padding:8px 6px 8px 30px;border-radius:8px;cursor:default}
.wl-app .lrow:hover{background:${MIX(INK, 3)}}
.wl-app .lrow.sel{background:${MIX(GOLD, 8)};box-shadow:inset 0 0 0 1px ${MIX(GOLD, 35)}}
.wl-app .lrow .s2{color:${LAB};font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-app .lrow .s2.mono{font-size:11.5px}
.wl-app .lrow .s2.red{color:${PINK}}
.wl-app .lrow .r{font:11.5px ${MONO};color:${DIM};text-align:right}
.wl-app .lrow .r.ink{color:${INK}}
.wl-app .lrow .nm{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-app .inbox{position:absolute;inset:0;display:grid;grid-template-columns:380px 1fr}
.wl-app .ilist{border-right:1px solid ${LINE};overflow:auto;padding:10px 10px 40px}
.wl-app .irow{display:grid;grid-template-columns:10px 1fr auto;gap:2px 10px;padding:10px;border-radius:10px;text-align:left;width:100%;align-items:start}
.wl-app .irow:hover{background:${PANEL}}
.wl-app .irow.sel{background:${PANEL2};box-shadow:inset 0 0 0 1px ${LINE2}}
.wl-app .irow .u{width:7px;height:7px;border-radius:50%;margin-top:6px;background:transparent}
.wl-app .irow .u.red{background:${RED}}
.wl-app .irow .u.blue{background:${BLUE}}
.wl-app .irow .t{font-weight:600;overflow-wrap:anywhere}
.wl-app .irow .s{grid-column:2 / -1;color:${LAB};font-size:12.5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.wl-app .irow .tm{font:11px ${MONO};color:${DIM};margin-top:2px}
.wl-app .idet{overflow:auto;padding:22px 28px 40px}
.wl-app .empty-st{display:grid;place-items:center;height:100%;color:${LAB};text-align:center}
.wl-app .empty-st b{display:block;font:700 22px ${HEAD};color:${INK};margin-bottom:6px}
.wl-app .drawer{position:absolute;top:0;right:0;bottom:0;width:min(540px,100%);background:${MIX('var(--ui-base)', 3, BG)};border-left:1px solid ${LINE2};box-shadow:-24px 0 48px ${SHADOW};transform:translateX(105%);transition:transform .32s ${EASE};z-index:20;display:flex;flex-direction:column}
.wl-app .drawer.on{transform:none}
.wl-app .dhead{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid ${LINE}}
.wl-app .dhead .x{margin-left:auto;color:${LAB};padding:4px 6px;border-radius:6px}
.wl-app .dhead .x:hover{background:${PANEL2}}
.wl-app .dbody{overflow:auto;padding:16px 18px 40px;flex:1}
.wl-app .det h2{margin:4px 0 6px;font:700 24px/1.1 ${HEAD};overflow-wrap:anywhere}
.wl-app .pill{margin-left:auto;display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:3px 9px;font-size:11.5px;font-weight:650;white-space:nowrap}
.wl-app .pill.needs{background:${RED};color:${BG}}
.wl-app .pill.working{background:${MIX(GOLD, 20)};color:${GOLD}}
.wl-app .pill.queued,.wl-app .pill.gone,.wl-app .pill.absent{background:${MIX(INK, 6)};color:${LAB}}
.wl-app .pill.done{background:${MIX(GREEN, 12)};color:${GREEN}}
.wl-app .stepper{display:flex;align-items:center;gap:8px;margin:14px 0 4px;padding:10px;background:${PANEL};border:1px solid ${LINE};border-radius:12px;overflow-x:auto}
.wl-app .layer{display:flex;flex-direction:column;gap:3px}
.wl-app .layer.flat{flex-direction:row;flex-wrap:wrap}
.wl-app .node{display:flex;align-items:center;gap:6px;padding:3px 8px;border-radius:7px;font-size:12px;white-space:nowrap;color:${LAB}}
.wl-app .node:hover{background:${MIX(INK, 5)}}
.wl-app .node.me{background:${PANEL2};color:${INK};box-shadow:inset 0 0 0 1px ${LINE2}}
.wl-app .link{width:14px;height:1px;background:${LINE2};flex:none}
.wl-app .dsec{margin-top:18px}
.wl-app .dsec>h3{margin:0 0 8px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${DIM};font-weight:600}
.wl-app .box{background:${PANEL};border:1px solid ${LINE};border-radius:12px;padding:12px 14px}
.wl-app .box.red{background:linear-gradient(180deg,${MIX(RED, 12, BG)},${MIX(RED, 6, BG)});border-color:${MIX(RED, 35, BG)}}
.wl-app .facts{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;font-size:12.5px;margin:0}
.wl-app .facts dt{color:${DIM}}
.wl-app .facts dd{margin:0;overflow-wrap:anywhere}
.wl-app .run{border:1px solid ${LINE};border-radius:10px;margin-bottom:6px;overflow:hidden}
.wl-app .run>button{display:grid;grid-template-columns:auto 1fr auto auto;gap:10px;align-items:center;width:100%;padding:9px 12px;text-align:left}
.wl-app .run>button:hover{background:${MIX(INK, 2)}}
.wl-app .run .when{color:${DIM};margin-left:8px;font-size:12px}
.wl-app .run .rb{padding:0 12px 12px;color:${LAB};font-size:12.5px;display:none;white-space:pre-wrap;overflow-wrap:anywhere}
.wl-app .run.open .rb{display:block}
.wl-app .run .rerr{color:${PINK};margin-bottom:6px}
.wl-app .run .o{font-size:11px;font-weight:700;border-radius:6px;padding:2px 7px;white-space:nowrap;background:${MIX(INK, 6)};color:${LAB}}
.wl-app .o.completed{background:${MIX(GREEN, 12)};color:${GREEN}}
.wl-app .o.crashed,.wl-app .o.timed_out,.wl-app .o.gave_up{background:${MIX(RED, 15)};color:${RED}}
.wl-app .o.blocked,.wl-app .o.running,.wl-app .o.rate_limited{background:${MIX(GOLD, 20)};color:${GOLD}}
.wl-app .feed{position:absolute;bottom:72px;right:22px;z-index:8;display:flex;flex-direction:column-reverse;gap:6px;width:340px;pointer-events:none}
.wl-app .fe{background:${PANEL};border:1px solid ${LINE2};border-radius:10px;padding:8px 11px;font-size:12px;display:grid;grid-template-columns:auto 1fr;gap:9px;animation:wl-fe .35s ${EASE} both;transition:opacity .6s}
.wl-app .fe .tm{font:11px ${MONO};color:${DIM}}
.wl-app .fe.red{border-color:${MIX(RED, 40, BG)}}
.wl-app .fe.red b{color:${RED}}
.wl-app .fe.gold b{color:${GOLD}}
.wl-app .fe.green b{color:${GREEN}}
@keyframes wl-fe{from{opacity:0;transform:translateX(18px)}}
.wl-app .rbar{display:grid;grid-template-columns:auto auto 1fr auto auto;gap:14px;align-items:center;padding:10px 20px;border-top:1px solid ${LINE};background:${RAIL};transform:translateY(100%);transition:transform .3s ${EASE};position:absolute;left:0;right:0;bottom:0;z-index:15}
.wl-app .rbar.on{transform:none}
.wl-app .rgrp{display:flex;gap:8px}
.wl-app .play{width:34px;height:34px;border-radius:50%;background:${GOLD};color:${BG};display:grid;place-items:center}
.wl-app .track{position:relative;height:34px;cursor:pointer}
.wl-app .track .ln{position:absolute;left:0;right:0;top:16px;height:2px;background:${PANEL2};border-radius:2px}
.wl-app .track .pr{position:absolute;left:0;top:16px;height:2px;background:${GOLD};border-radius:2px}
.wl-app .track .ev{position:absolute;top:10px;width:2px;height:14px;border-radius:2px;background:${LINE2}}
.wl-app .track .ev.red{background:${RED};height:18px;top:8px}
.wl-app .track .ev.gold{background:${MIX(GOLD, 60)}}
.wl-app .track .th{position:absolute;top:9px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:${GOLD};border:3px solid ${BG};box-shadow:0 0 0 1px ${GOLD}}
.wl-app .track .hr{position:absolute;top:26px;font:10px ${MONO};color:${DIM};transform:translateX(-50%);white-space:nowrap}
.wl-app .rng{display:flex;gap:2px;background:${PANEL};border:1px solid ${LINE};border-radius:8px;padding:2px}
.wl-app .rng button{padding:3px 8px;border-radius:6px;color:${LAB};font-size:11.5px}
.wl-app .rng button.on{background:${PANEL2};color:${INK}}
.wl-app .rbar .rt{font:12px ${MONO};color:${INK};white-space:nowrap;min-width:150px;text-align:left}
.wl-app .scrim{position:absolute;inset:0;background:${MIX(BG, 55)};z-index:70;display:none;align-items:flex-start;justify-content:center;padding-top:10vh}
.wl-app .scrim.on{display:flex;animation:wl-fade .14s}
@keyframes wl-fade{from{opacity:0}}
.wl-app .pal,.wl-app .help,.wl-app .dlg{background:${PANEL};border:1px solid ${LINE2};border-radius:14px;box-shadow:0 30px 80px ${SHADOW};animation:wl-pop .16s ${EASE}}
@keyframes wl-pop{from{transform:scale(.97);opacity:0}}
.wl-app .pal{width:min(640px,92%);overflow:hidden}
.wl-app .pal .ctx{margin:12px 14px 0;display:inline-flex;gap:6px;font-size:11.5px;color:${LAB};background:${PANEL2};border-radius:6px;padding:3px 8px}
.wl-app .pal input{width:100%;background:none;border:0;outline:0;color:${INK};font:inherit;font-size:16px;padding:12px 16px 14px;border-bottom:1px solid ${LINE}}
.wl-app .pres{max-height:52vh;overflow:auto;padding:6px}
.wl-app .pg{padding:8px 10px 4px;font-size:11px;color:${DIM};letter-spacing:.06em;text-transform:uppercase}
.wl-app .pi{display:grid;grid-template-columns:18px 1fr auto;gap:10px;align-items:center;padding:8px 10px;border-radius:8px;width:100%;text-align:left}
.wl-app .pi.on{background:${PANEL2}}
.wl-app .pi .s{color:${DIM};font-size:12px;margin-left:8px}
.wl-app .help{width:min(560px,92%);padding:18px 22px;display:grid;grid-template-columns:1fr 1fr;gap:6px 28px}
.wl-app .help h3,.wl-app .dlg h3{grid-column:1 / -1;margin:0 0 8px;font:700 20px ${HEAD}}
.wl-app .help div{display:flex;justify-content:space-between;gap:10px;font-size:12.5px;color:${LAB};padding:3px 0}
.wl-app .dlg{width:min(620px,92%);padding:18px 22px;max-height:80vh;overflow:auto}
.wl-app .dlg .dsub{margin:-4px 0 10px;font-size:13px;font-weight:600;color:${INK}}
.wl-app .dlg p{margin:0 0 10px;color:${LAB}}
.wl-app .dlg .sub{color:${DIM};font-size:12px;margin:8px 0}
.wl-app .dlg .limrow{display:flex;align-items:center;gap:10px;font-weight:600}
.wl-app .dlg .lim{width:90px;background:${BG};border:1px solid ${LINE2};border-radius:8px;color:${INK};font:inherit;padding:5px 8px}
.wl-app .dlg .steps{margin:4px 0;padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:12.5px}
.wl-app .dlg .steps li{display:grid;grid-template-columns:1fr auto;gap:2px 10px}
.wl-app .dlg .steps b{font-size:11px;color:${DIM}}
.wl-app .dlg .steps [data-state="done"] b{color:${GREEN}}
.wl-app .dlg .steps [data-state="failed"] b,.wl-app .dlg .steps code{color:${RED}}
.wl-app .dlg .steps code{grid-column:1 / -1;font:11px ${MONO}}
.wl-app .wl-toasts{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);z-index:80;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none}
.wl-app .toast{pointer-events:auto;display:flex;align-items:center;gap:14px;background:${PANEL2};border:1px solid ${LINE2};border-radius:11px;padding:9px 10px 9px 14px;box-shadow:0 14px 40px ${SHADOW};font-size:12.5px;animation:wl-tin .3s ${EASE};max-width:560px}
.wl-app .toast.bad{border-color:${MIX(RED, 45, BG)}}
.wl-app .toast .btn{padding:4px 9px}
.wl-app .redt{color:${RED}}
@keyframes wl-tin{from{opacity:0;transform:translateY(12px)}}
.wl-app .badge{display:inline-flex;align-items:center;gap:7px;margin:6px 0 2px;padding:4px 10px 4px 8px;border-radius:99px;font-size:12px;font-weight:650;color:${PINK};background:${MIX(RED, 13)};border:1px solid ${MIX(RED, 33)}}
.wl-app .badge i{width:7px;height:7px;border-radius:50%;background:${RED};animation:wl-pulse 1.8s ${EASE} infinite}
.wl-app .badge.usage_limit,.wl-app .badge.time_limit{color:${MIX(GOLD, 50, INK)};background:${MIX(GOLD, 13)};border-color:${MIX(GOLD, 33)}}
.wl-app .badge.usage_limit i,.wl-app .badge.time_limit i{background:${GOLD}}
.wl-app .badge.asks_you,.wl-app .badge.review{color:${MIX(BLUE, 45, INK)};background:${MIX(BLUE, 13)};border-color:${MIX(BLUE, 35)}}
.wl-app .badge.asks_you i,.wl-app .badge.review i{background:${BLUE}}
@keyframes wl-pulse{70%{box-shadow:0 0 0 7px transparent}}
.wl-app .story{margin:14px 0 6px;padding:18px;border-radius:14px;background:linear-gradient(160deg,${MIX(RED, 10, BG)},${PANEL} 60%);border:1px solid ${MIX(RED, 25)}}
.wl-app .shead{font-family:${HEAD};font-size:24px;line-height:1.15;letter-spacing:.01em}
.wl-app .sask{margin-top:6px;font-size:12.5px;color:${DIM}}
.wl-app .swhy{margin:10px 0 14px;font-size:13.5px;line-height:1.5;color:${LAB}}
.wl-app .quote{margin:0 0 12px;padding:10px 12px;border-left:3px solid ${BLUE};background:${MIX(BLUE, 7)};border-radius:6px;font-size:13px;white-space:pre-wrap;overflow-wrap:anywhere}
.wl-app .quote .qh{font-size:11px;color:${DIM};text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.wl-app .hint{display:flex;flex-direction:column;gap:2px;margin-top:8px;font-size:11.5px;color:${DIM}}
.wl-app .hint b{color:${LAB};font-weight:600}
.wl-app .tlbox{margin-top:16px;padding-top:12px;border-top:1px solid ${LINE}}
.wl-app .tlh{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${DIM}}
.wl-app .tline{position:relative;height:30px;margin:8px 0 4px}
.wl-app .tline .trail{position:absolute;left:2%;right:2%;top:14px;height:2px;background:linear-gradient(90deg,${LINE2},${MIX(RED, 40)})}
.wl-app .tdot{position:absolute;top:8px;width:14px;height:14px;margin-left:-7px;border-radius:50%;border:2px solid ${BG};cursor:pointer;padding:0;transition:transform .2s ${EASE}}
.wl-app .tdot:hover,.wl-app .tdot:focus,.wl-app .tdot.on{transform:scale(1.45);outline:none}
.wl-app .tdot.plain{background:${DIM}}
.wl-app .tdot.work{background:${GOLD}}
.wl-app .tdot.warn{background:${GOLD};box-shadow:0 0 0 3px ${MIX(GOLD, 20)}}
.wl-app .tdot.bad{background:${RED};box-shadow:0 0 0 3px ${MIX(RED, 20)}}
.wl-app .tdot.good{background:${GREEN}}
.wl-app .tdot.you{background:${BLUE}}
.wl-app .tltip{min-height:38px;font-size:13px;line-height:1.45;color:${INK}}
.wl-app .tltip b{color:${DIM};font-weight:600;margin-right:8px}
.wl-app .tltip code{display:block;margin-top:4px;font-family:${MONO};font-size:11px;color:${DIM};white-space:pre-wrap;word-break:break-word}
.wl-app details.tech{margin-top:14px}
.wl-app details.tech summary{cursor:pointer;font-size:12px;color:${DIM};padding:6px 0}
.wl-app .loop{margin:12px 0 4px;padding:12px 14px;border-radius:12px;background:${PANEL};border:1px solid ${LINE2}}
.wl-app .lph{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${DIM};margin-bottom:8px}
.wl-app .lpr{display:flex;align-items:center;gap:4px;padding:4px 0;flex-wrap:wrap}
.wl-app .lpk{width:22px;font-size:11.5px;color:${GOLD};font-weight:700}
.wl-app .lpl{display:flex;gap:3px;padding:2px;border:1px dashed ${LINE2};border-radius:8px;flex-wrap:wrap}
.wl-app .lpn{font-size:11.5px;padding:3px 7px;border-radius:7px;border:1px solid ${LINE2};background:${PANEL2};color:${INK};white-space:nowrap}
.wl-app .lpn.ok::before,.wl-app .lpn.bad::before,.wl-app .lpn.working::before,.wl-app .lpn.needs::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:5px;vertical-align:1px;background:${GREEN}}
.wl-app .lpn.ok{border-color:${MIX(GREEN, 35)}}
.wl-app .lpn.bad{border-color:${RED};background:${MIX(RED, 12)};color:${PINK}}
.wl-app .lpn.bad::before{background:${RED}}
.wl-app .lpn.working{border-color:${GOLD}}
.wl-app .lpn.working::before{background:${GOLD};animation:wl-pulse 1.8s infinite}
.wl-app .lpn.needs{border-color:${RED}}
.wl-app .lpn.needs::before{background:${RED}}
.wl-app .lpn.queued,.wl-app .lpn.absent,.wl-app .lpn.gone{color:${DIM};border-style:dashed}
.wl-app .lpn.me{outline:2px solid ${GOLD};outline-offset:1px}
.wl-app .lpa{width:8px;height:2px;background:${LINE2};flex:none}
.wl-app .lpb{display:flex;gap:8px;margin:2px 0 6px 28px;font-size:12px;line-height:1.4;color:${PINK}}
.wl-app .lpb b{color:${RED}}
.wl-app .lpc{color:${RED};font-size:15px;line-height:1}
.wl-app .rline{display:flex;gap:6px;align-items:center;margin:3px 0 2px;font-size:12px;color:${PINK}}
.wl-app .rline span{color:${RED};font-size:14px}
.wl-app .cans{margin:8px 0 2px;padding:8px 10px;border-radius:8px;background:${MIX(GREEN, 9)};border:1px solid ${MIX(GREEN, 28)};font-size:12.5px;line-height:1.45;color:${MINT};animation:wl-enter .35s ${EASE}}
.wl-app .cans.bad{background:${MIX(RED, 9)};border-color:${MIX(RED, 35)};color:${PINK}}
.wl-app .chint,.wl-app .cwarn{font-size:11.5px;color:${DIM};margin:4px 0}
.wl-app .cwarn{color:${PINK}}
.wl-app .res{display:flex;gap:7px;align-items:baseline;margin:5px 0 2px;font-size:13px;line-height:1.4}
.wl-app .res span{font-weight:700}
.wl-app .res.ok{color:${MINT}}
.wl-app .res.ok span{color:${GREEN}}
.wl-app .res.back{color:${PINK}}
.wl-app .res.back span{color:${RED}}
.wl-app .res.big{font-size:15px;margin:12px 0 4px}
@media (prefers-reduced-motion: reduce){.wl-app *,.wl-app *::before,.wl-app *::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}}
`

function h(type, props, ...kids) {
  const { key, ...rest } = props || {}
  if (!kids.length) return jsx(type, rest, key)
  if (kids.length === 1) return jsx(type, { ...rest, children: kids[0] }, key)
  return jsxs(type, { ...rest, children: kids }, key)
}

function Page() {
  const t = usePluginI18n(ID)
  const tRef = useRef(t)
  tRef.current = t
  const mount = useRef(null)
  useEffect(() => {
    if (!mount.current) return undefined
    const app = createApp(mount.current, {
      t: (key, ...args) => tRef.current(key, ...args),
      rest: typeof ctxRef?.rest === 'function' ? path => ctxRef.rest(path) : null,
      navigate: path => host?.navigate?.(path)
    })
    return () => app.destroy()
  }, [])
  return h('div', { className: 'wl-host' }, h('style', null, STYLE), h('div', { ref: mount, className: 'wl-mount' }))
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
