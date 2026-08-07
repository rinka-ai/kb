---
id: summary-2026-08-01-effective-go-applied-to-zappx-server
type: summary
title: Effective Go Applied to the Zappx Server
tags: [go, golang, effective-go, zappx, rollify, server-audit, concurrency, error-handling, real-money]
summary: "A complete 60-section Effective Go audit of the Zappx backend finds strong modern player-auth code, but material lifecycle, worker-ownership, legacy error-boundary, wallet-durability, documentation, and capacity-evidence gaps remain."
source_count: 1
canonical_for: [Effective Go Zappx audit, Zappx Go idioms, Rollify Go server review, Go lesson application matrix]
review_status: reviewed
last_reviewed: 2026-08-01
review_due: 2026-09-01
confidence: "0.94"
---

# Effective Go Applied to the Zappx Server

## Executive Assessment

This report applies every named entry in [[2026-08-01-effective-go|Effective Go]] to the current Zappx backend without changing product code. The server is substantially idiomatic at the language level, particularly in the newer player-auth paths: explicit constructors, narrow repository/store seams, guard-clause control flow, keyed literals, bounded password work, `%w` error chains, typed error classification, and exact handler contracts are all strong. The older admin, content, wallet, and process-composition paths carry most of the consequential gaps.

The 60-entry matrix classifies 34 entries as aligned, 10 as partial, 6 as gaps, 7 as not applicable, 2 as contextual, and 1 as mixed. These labels are a review index, not a quality score: one financial durability gap matters more than many aligned formatting or data-structure entries.

The highest-risk findings are not all caused by Effective Go. The language guide directly exposes ignored errors, bypassed defers, unclear goroutine lifetimes, panic-prone assertions, and weak error ownership. Atomic queue handoff, append-only ledger behavior, idempotency, exact money representation, reconciliation, and the 30,000-active requirement come from stronger Rollify financial and scalability contracts.

## Audited Snapshot

| Item | Evidence |
|---|---|
| Official source | `https://go.dev/doc/effective_go`, HTTP 200 on 2026-08-01 UTC |
| Source snapshot | 142,913 bytes; 4,333 HTML lines; SHA-256 `31b3beeb4fea135b85070f0362a1373b5e67981b8d6adc4afbb7291e06cdac5f` |
| Article coverage | Snapshot lines 449–4,150; all 60 heading-level entries inventoried and mapped below |
| Product repository | `/srv/dev/rollify-workspace/zappx` |
| Server | `/srv/dev/rollify-workspace/zappx/core-backend` |
| Branch and commit | `ROL-121-create-wallet-nonce` at `726d088` |
| Declared Go version | Go 1.26.5 (`core-backend/go.mod:1-3`) |
| Go inventory | 87 files / 12,201 lines, including 1,744 generated Swagger lines |
| Hand-maintained inventory | 10,457 lines: 60 production files / 4,402 lines and 26 test files / 6,055 lines |
| Local readiness | Rollify preflight: 69 passed, 0 failed; local `go` and `dbmate` commands unavailable |
| Preserved product state | Pre-existing modified `zappx/ARCHITECTURE.md`, modified wallet-nonce Redis integration test, and untracked `.playwright-mcp/`; none changed by this audit |

The audit read current source, tests, manifests, CI, generated Swagger, Echo v5.3.0 source in the local module cache, and the controlling Rollify/Zappx documents. It excluded generated `docs/docs.go` from hand-written style counts but inspected generated Swagger as a public-contract artifact.

Evidence paths are relative to `/srv/dev/rollify-workspace/zappx` unless absolute. For compact matrix entries, `cmd/` means `core-backend/cmd/`, `auth/` means `core-backend/internal/modules/auth/`, `wallet_*.go` means `core-backend/internal/modules/wallet/wallet_*.go`, and `model/` means `core-backend/model/`. Wrapper standards such as `ZAPPX_ENGINEERING_STANDARD.md` are relative to `/srv/dev/rollify-workspace`.

## Evidence and Authority Boundary

The application order is:

1. Live delivery contract and recorded Rollify product/security/financial decisions.
2. Current Zappx implementation, tests, migrations, manifests, CI, and generated contract.
3. The locked Zappx module/DTO/file conventions and engineering standard.
4. Current Go specification, release notes, package documentation, Go Doc Comments, and Go Code Review Comments.
5. Effective Go as the historical idiom guide.

Consequences:

- Effective Go cannot authorize collapsing module-owned `dto/` packages, removing module prefixes from established filenames, or reorganizing modules.
- The older document's constructor-return-interface example does not override Zappx's consumer-owned repository interfaces and concrete service convention.
- `ARCHITECTURE.md:180-198` describes the existing log-at-every-layer behavior, while `ZAPPX_ENGINEERING_STANDARD.md:720-730` explicitly classifies that duplication as current debt and sets the forward standard: internal layers wrap and return; the boundary logs once.
- `ARCHITECTURE.md:235-237` records direct context assertions, but its current-user contract at `ARCHITECTURE.md:304-322` requires a missing identity to become a redacted 500. A shared typed accessor needs architecture authority; a generic style cleanup must not silently fork the convention.

## Prioritized Findings

### P0 — Existing financial launch blockers, confirmed but not created by this audit

1. **The pending wallet row and durable enqueue do not commit atomically.** `core-backend/internal/modules/wallet/wallet_service.go:104-112` inserts the row before `EnqueueContext`; failure returns an error while leaving the intent pending. The governing standard already records the missing outbox at `ZAPPX_ENGINEERING_STANDARD.md:768-770`.
2. **The wallet transaction table is not a complete append-only ledger.** `core-backend/model/wallet.go:19-25` stores a mutable status record, and `wallet_repository.go:113-128` mutates status and balance. Idempotency keys, immutable ledger entries, and reconciliation remain absent by the recorded standard.
3. **Float-backed value fields conflict with the no-floats money rule and need domain classification.** `core-backend/model/vip.go:12-19,32-37` uses `float64` for bonuses, wager requirements, XP, and percentages; `model/currency.go:17` uses `map[string]float64` for exchange rates. Amounts must use exact units; ratios/rates require an explicit decimal/rational decision rather than an incidental style edit.

### P1 — Direct runtime and boundary findings

1. **Fatal exits bypass deferred cleanup.** `cmd/web.go:33-35,75`, `cmd/admin.go:41-43,62`, `cmd/admin.go:67-78`, and `cmd/worker.go:27-30,51` combine `defer a.Close()` with `log.Fatal`, which calls `os.Exit`. Echo handles signals internally, but the caller's resource defers still cannot run after `Start`/`Run` returns.
2. **The worker subscriber has no lifecycle owner.** `cmd/worker.go:34-41` starts the only production goroutine with `context.Background()`, never closes the Redis subscription, has no completion/error path, and silently ends if its channel closes.
3. **Application cleanup is incomplete and unobservable.** `internal/app/app.go:40-43` discards task/Redis close results and never closes the underlying `database/sql` handle behind GORM.
4. **Wallet error discards cross a real-money cache/queue path.** `wallet_service.go:37-50,109-117` ignores cache read classification, JSON marshal, cache write, and publication results. `wallet_tasks.go:28-38` suppresses the wallet lookup failure and ignores invalidation/publication failures, so a stale balance can survive until TTL without an owned signal.
5. **Legacy error ownership is inverted.** Category, currency, page, VIP, admin, and wallet repositories log bare errors; services and handlers often log them again; handlers such as `wallet_handler.go:37-40`, `admin_handler.go:68-71,89-91,115-117`, and the content handlers return `err.Error()` to clients. Player auth instead wraps internal errors and maps safe verdicts at the boundary.
6. **Admin dependency failures become credential verdicts.** `auth/admin_service.go:32-39` maps every lookup error to invalid credentials, and `auth/admin_middleware.go:21-24` maps every session lookup failure to 401. This makes outages look like user denial and conflicts with the newer player-auth fail-closed 503 taxonomy.
7. **Admin bearer parsing is deliberately looser.** `auth/admin_handler.go:22-24` uses `strings.TrimPrefix`, accepting an arbitrary raw Authorization value when the prefix is absent; `auth/auth_middleware.go:16-23` implements the strict player grammar and documents the mismatch.

### P1 — Capacity and production-lifecycle evidence gaps

1. **Database capacity is implicit.** `internal/database/database.go:10-12` opens GORM without a ping, explicit max-open/max-idle limits, connection lifetime/idle limits, or operation instrumentation. Defaults cannot prove the 30,000-active target.
2. **The application uses Echo's deliberately simple start helper.** Echo v5.3.0 labels `Echo.Start` as examples/demo-oriented; it supplies a 30-second read timeout and a default graceful window, but Zappx does not configure header/write/idle limits, request-byte bounds, app cleanup evidence, or workload-specific behavior in `cmd/web.go:37-75` and `cmd/admin.go:45-62`.
3. **Access logging is unbounded hot-path work.** `cmd/root.go:74-103` synchronously logs every request at info without a request ID or sampling. The engineering standard already records this at `ZAPPX_ENGINEERING_STANDARD.md:737-754`.

### P2 — Maintainability and verification gaps

1. **Documentation coverage is incomplete.** Package comments exist for main, cmd, app, queue, auth, auth/dto, and wallet/dto. Production packages config, database, model, category, currency, page, VIP, and wallet lack a package comment; many of the 140 exported top-level declarations lack behavior-focused comments.
2. **Internal maintenance prose leaks into generated Swagger.** Inline `ponytail` comments in `model/admin.go:19` and `model/wallet.go:14` appear as public descriptions in `docs/swagger.json:1425,1651` and `docs/swagger.yaml:243,392`.
3. **Coverage is concentrated in auth.** Twenty-five of the 26 test files are under auth; the sole wallet test (`wallet_service_test.go:21-33`) covers only invalid/insufficient amounts. Worker, admin, category, currency, page, and VIP have no focused behavior tests.
4. **One standard initialism is inconsistent.** `cmd/root.go:40-42` names `overrideDocBaseUrl`; current Go naming convention is `overrideDocBaseURL`.
5. **The current branch has an unrelated pre-existing traceability violation.** The dirty wallet-nonce Redis integration test contains `ROL-121` in a source comment, contrary to the Rollify rule against tracker IDs in source/test identifiers or comments. This audit did not touch the user-owned change.

## Complete 60-Entry Lesson Matrix

The status labels are `aligned`, `partial`, `gap`, `contextual`, and `not applicable`. Qualifiers such as “modern” or “unverified” explain the evidence boundary.

| # | Effective Go entry | Status | Application to Zappx and repository evidence |
|---:|---|---|---|
| 1 | Effective Go | contextual | Use it as an idiom baseline, not a complete standard. The source declares its 2009 scope; Zappx declares Go 1.26.5 in `core-backend/go.mod:1-3` and has stronger architecture/security/financial rules. |
| 2 | Introduction | aligned | The backend is recognizably Go-shaped: small packages, explicit constructors, `context.Context` at dependencies, and conventional error returns. The newer auth module is more consistent than the legacy scaffold. |
| 3 | Examples | partial | Auth has 25 unit/integration test files and executable contract sequences; worker/admin/content modules have no focused tests, and wallet has one validation-only test. Go `Example` functions are optional for this internal service. |
| 4 | Formatting | aligned, unverified locally | CI runs `gofmt -l` and fails on drift at `.github/workflows/backend-ci.yml:69-76`; `go vet`, Staticcheck, build, and race tests follow at lines 78-94. Local Go is missing, so current formatting was not executable-verified here. |
| 5 | Commentary | gap | Package docs exist in `cmd/root.go:1`, `internal/app/app.go:1`, `internal/queue/queue.go:1`, and `internal/modules/auth/doc.go:1`; eight production packages lack them, and many exported types/functions are undocumented. |
| 6 | Names | partial | Names are generally concise and domain-oriented. Generic names such as `wallet.Handler` and `wallet.Repository` read clearly through package context; initialism drift remains in `cmd/root.go:40-42`. |
| 7 | Package names | aligned | All production package names are short lowercase words matching directory basenames. No dot import or stuttering package prefix was found. |
| 8 | Getters | aligned | `GetByID`, `GetBySlug`, and `GetOrCreateByUserID` are repository queries with I/O/error semantics, not trivial field accessors; the no-`Get` getter rule does not call for renaming them. |
| 9 | Interface names | aligned | `Repository`, `WalletChallengeStore`, and `rateLimiter` express capabilities in their consuming packages. No method misuses canonical `Read`, `Write`, `String`, `Close`, or `Flush` meanings. |
| 10 | MixedCaps | partial | `userID`, `PublicID`, `BaseURL`, and `HTTPError` casing is consistent. `overrideDocBaseUrl` at `cmd/root.go:40-42` should use `URL` when an authorized change touches it. |
| 11 | Semicolons | aligned | A production-source scan found no explicit statement semicolons; apparent matches were struct-tag content. |
| 12 | Control structures | aligned | Conditions omit parentheses, range/switch are conventional, and guard clauses dominate the newer auth paths. |
| 13 | If | aligned | Auth uses initializer statements and early returns effectively, for example registration conflict handling at `auth/auth_service.go:170-209`. |
| 14 | Redeclaration and reassignment | aligned | Short declarations keep error scope local; the reviewed production paths did not reveal confusing accidental shadowing. CI vet/Staticcheck provide an additional mechanical gate. |
| 15 | For | aligned, modern | `strings.SplitSeq` appears at `cmd/ip_extractor.go:30`; integer range appears at `auth/auth_service.go:178` and `auth/auth_wallet_address.go:69`. The pre-Go-1.22 shared-loop-variable warning is historical for this module. |
| 16 | Switch | aligned | Expressionless switches make auth lifecycle verdict precedence explicit at `auth/auth_service.go:347-362,380-387,403-412`. |
| 17 | Type switch | not applicable | No production flow requires dynamic type classification; adding a type switch would not clarify the present domain model. |
| 18 | Functions | aligned | Functions are mostly cohesive and explicit. Legacy handlers/services mix logging and business flow, but their signatures remain ordinary Go rather than framework magic. |
| 19 | Multiple return values | aligned | Value/error, validation-input/details, token/session, and state/decision pairs use multiple returns directly; examples include `ValidateRegistration` and `newSession`. |
| 20 | Named result parameters | aligned | Named results are rare: `parseArgon2idHash` at `auth/auth_password.go:139-159` uses `salt`, `key`, and `err` to clarify staged decoding, while returns remain explicit. No naked production return was found. |
| 21 | Defer | gap | Hash-budget release is correctly deferred at `auth/auth_service.go:129-144`, and wallet rollback is deferred at `wallet_repository.go:92-105`. `log.Fatal` bypasses the process-level `defer a.Close()` calls, and close/rollback errors are discarded. |
| 22 | Data | aligned | Zero values, pointers, slices, maps, and keyed literals are used conventionally. Domain correctness still depends on exact money/schema rules beyond language-level data semantics. |
| 23 | Allocation with new | aligned | No hand-maintained production use of `new` was found; constructors and address-taking are clearer for the current types. |
| 24 | Constructors and composite literals | aligned | Constructors are explicit and composite literals are keyed, including auth registration/session state. `NewRepository` is concise within package context and follows the locked backend convention. |
| 25 | Allocation with make | aligned | `make` creates token/password buffers and the bounded password semaphore, notably `auth/auth_password.go:79,111`. Capacities communicate security/resource intent. |
| 26 | Arrays | not applicable | Business code does not depend on array-copy semantics; variable buffers and collections are slices. |
| 27 | Slices | aligned | Every production `append` result is assigned. Auth bounds password/user-agent inputs and uses capacity-aware buffers; no harmful slice aliasing was found. |
| 28 | Two-dimensional slices | not applicable | No two-dimensional production slice storage exists. |
| 29 | Maps | aligned | Maps model localized content, validation details, log fields, event payloads, and exchange-rate JSON. Missing-versus-zero distinctions use explicit checks where meaningful. Exact numeric representation for exchange rates remains a domain decision. |
| 30 | Printing | partial | Structured Logrus fields dominate, but legacy layers duplicate errors and `cmd/worker.go:38` logs raw event payloads. `cmd/admin.go:80` prints an admin email to stdout. No custom `String` recursion issue exists. |
| 31 | Append | aligned | All production calls assign the returned slice header, including `cmd/ip_extractor.go:35` and auth validation detail accumulation. |
| 32 | Initialization | partial | `internal/app/app.go:24-37` and module constructors make dependency construction explicit; command registration still relies on package globals plus `init`. |
| 33 | Constants | aligned | Limits, durations, task/event names, and statuses are centralized. Typed domain states could make invalid financial status values harder to represent, but that is an architecture choice rather than an Effective Go failure. |
| 34 | Variables | aligned | Variables generally use local scope and useful zero values. Package-level maps/slices are unexported and treated read-only by convention. |
| 35 | The init function | gap, contextual | `cmd/web.go:28-30`, `cmd/admin.go:35-38`, and `cmd/worker.go:22-24` register Cobra commands. Effective Go permits necessary initialization; Zappx's stronger no-init-side-effects rule favors explicit command assembly, but changing it requires architecture authority. Generated Swagger also owns a generated `init`. |
| 36 | Methods | aligned | Services, repositories, handlers, and modules expose cohesive method sets around their owned behavior. |
| 37 | Pointers vs. Values | aligned | Dependency-owning/mutable structs use pointer receivers; stateless GORM `TableName` methods on currency/VIP types use value receivers. |
| 38 | Interfaces and other types | aligned | Concrete implementations and narrow contracts are separated without reflection-heavy machinery or inheritance emulation. |
| 39 | Interfaces | aligned with convention | Repository interfaces are consumer-side seams; services are concrete. `WalletChallengeStore` and `rateLimiter` exist because tests fake them. Preserve this layout rather than forcing the older return-interface advice everywhere. |
| 40 | Conversions | partial | Explicit conversions are limited. `wallet_handler.go:95-107` parses a `uint64` path value and converts it to `uint` without an explicit architecture-width bound; amd64 makes it operationally safe today, but a direct domain bound would be clearer. |
| 41 | Interface conversions and type assertions | partial | `auth/auth_handler.go:204-209` uses comma-ok and returns a redacted 500 when context identity is absent. Wallet/admin handlers use four unchecked assertions at `wallet_handler.go:35,60` and `admin_handler.go:66,109` under the current architecture convention, so wiring defects become recovered panics. |
| 42 | Generality | contextual | The document's constructor-return-interface advice is not universal modern design. Zappx intentionally defines consumer-owned repository interfaces and concrete services; generic Go advice cannot authorize broad refactoring. |
| 43 | Interfaces and methods | aligned | Implicit satisfaction works normally, and pointer method sets match intended implementations. Constructors returning repository interfaces already provide compile-time satisfaction checks. |
| 44 | The blank identifier | gap | `wallet_service.go:109` discards JSON marshal failure; cache/publication/close results are ignored elsewhere. Direct `crypto/rand.Read` calls in auth are intentional under Go 1.24+ semantics, and `hash.Hash.Write` has a no-error contract. |
| 45 | The blank identifier in multiple assignment | gap | `payload, _ := json.Marshal(...)` at `wallet_service.go:109` is the clearest avoidable discard. Best-effort cleanup discards in isolated tests are a separate, acceptable case when documented. |
| 46 | Unused imports and variables | aligned | The compiler plus CI vet/build gates enforce this. No blank import is used merely to silence an unused dependency. |
| 47 | Import for side effect | aligned | No hand-maintained blank side-effect import exists. Swagger registration is reached through a normal `zappx/docs` import and a generated `init`. |
| 48 | Interface checks | not applicable | Manual `var _ Interface = (*Type)(nil)` checks are unnecessary here because repository constructors return the interface and compile-check their concrete result. |
| 49 | Embedding | aligned, contextual | Production code does not use embedding as subclassing. `wallet_service_test.go:11-18` intentionally embeds `Repository` so unexpected fake calls fail loudly; the tradeoff is documented. |
| 50 | Concurrency | partial | The auth hash guard is bounded and fail-fast; the worker owns one unmanaged subscription goroutine. Static correctness cannot establish the fleet's 30,000-active capacity. |
| 51 | Share by communicating | aligned | `auth/auth_password.go:71-94` uses a buffered channel as a non-blocking Argon2 admission semaphore. Wallet state correctly remains under database row locks; channels should not replace transactional ownership. |
| 52 | Goroutines | gap | The only actual production `go func` is `cmd/worker.go:35-41`; it has no cancellation owner, subscription close, error signal, restart policy, or shutdown join. |
| 53 | Channels | partial | The password guard channel has explicit capacity and balanced deferred release. The Redis subscription channel is consumed without owned lifecycle or closure. |
| 54 | Channels of channels | not applicable | No request/reply channel topology exists; HTTP, Redis, and asynq own those communication boundaries. |
| 55 | Parallelization | not applicable | No CPU-parallel algorithm exists. Password work is concurrency-bounded rather than parallelized, which is the correct concern. |
| 56 | A leaky buffer | not applicable | No custom buffer pool/free-list exists; introducing one without allocation profiling would be premature. |
| 57 | Errors | mixed | Player auth wraps with `%w`, uses `errors.Is`/`errors.As`, preserves infrastructure-versus-verdict distinctions, and redacts responses (`auth/auth_service.go:170-209,264-333,371-413`). Legacy admin/content/wallet code logs repeatedly, returns bare errors, and leaks `err.Error()` at HTTP boundaries. |
| 58 | Panic | aligned | No explicit production `panic` call exists. Direct `crypto/rand.Read` use follows its current fill-or-terminate contract rather than an ignored ordinary error. |
| 59 | Recover | aligned, partial | Echo recovery middleware is installed at `cmd/web.go:38` and `cmd/admin.go:46`; internal code does not swallow panics. Unchecked identity assertions still route avoidable wiring defects through that boundary. |
| 60 | A web server | partial, modern | The source's QR server is pedagogical. Zappx uses Echo v5.3.0, whose `Start` provides signal handling, a default graceful timeout, and a read timeout, but upstream labels it demo-simple. Zappx still lacks app-owned limits, complete cleanup, dependency pool bounds, and production-shaped lifecycle/capacity evidence. |

## Modern Go Corrections Applied

- **Generics:** Effective Go predates them. Zappx uses constrained, simple response helpers such as `model.ReturnPaginatedResponse[T]` at `model/http_common.go:21-51`; this is compatible with the guide's clarity goal.
- **Modules:** the module contract is explicit in `core-backend/go.mod`; package/import advice is interpreted inside that module rather than a GOPATH-era workspace.
- **Loop variables:** Go 1.22 changed loop-variable lifetime for modules using the new semantics. Zappx's Go 1.26.5 loops do not need automatic per-iteration shadow copies.
- **Error chains:** `%w`, `errors.Is`, and `errors.As` are the modern mechanism. Player auth demonstrates the target; legacy modules do not.
- **Context:** request and dependency calls generally carry `context.Context`; the worker's `context.Background()` is the notable ownership failure.
- **Randomness:** current `crypto/rand.Read` fills or terminates and returns no error; those ignored-result scans must not be reported as ordinary unchecked errors.
- **HTTP:** framework defaults are evidence only after inspecting the pinned version. Echo's helper supplies some lifecycle behavior, but application-specific limits and downstream budgets remain unproven.

## Recommended Remediation Sequence

Each sequence needs its own live ticket and required specialist authority; this report does not authorize product writes.

1. **Wallet durability and exact-value contract:** idempotency keys, transactional outbox, append-only ledger, reconciliation, exact bonus/wager/rate representation, and public sequence/integration tests.
2. **Process and worker lifecycle:** return errors rather than fatal-exit inside runners, close SQL/Redis/asynq resources, own subscription cancellation/join/restart, and prove signal-driven drain.
3. **Error and admin-auth boundary:** strict shared Bearer parsing, dependency-versus-verdict taxonomy, internal `%w` wrapping, log-once ownership, response redaction, request IDs, and focused negative tests.
4. **Dependency and HTTP capacity budgets:** explicit DB/Redis/queue/server limits, request-size/time bounds, safe admission, observability, saturation/failure tests, then production-shaped load evidence.
5. **Documentation and generated-contract hygiene:** package/export docs, `URL` casing, remove internal maintenance prose from annotations, regenerate Swagger, and add a deterministic check where practical.

## Validation Boundary

- Read-only Rollify preflight passed 69/69 checks.
- `git diff --check` passed in the product repository at audit time.
- No Go command was available locally, so `gofmt`, `go vet`, Staticcheck, build, unit tests, race tests, and integration tests were not rerun. CI configuration shows these gates exist, but configuration is not proof of the current branch result.
- No database, Redis service, worker, migration, load test, shared environment, product file, commit, or publication was changed or run.
- Negative source claims (“no explicit panic,” “one goroutine,” “no production `new`,” and similar) came from repository-wide searches over hand-maintained production Go and exclude generated Swagger/tests unless stated.

## Related

- [[2026-08-01-effective-go]]
- [[effective-go-for-production-servers]]
- [[internal-engineering-conventions]]
- [[codebase-architecture]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Notes

- [[2026-08-01-effective-go]]
