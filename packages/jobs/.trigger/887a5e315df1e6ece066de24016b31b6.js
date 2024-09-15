process.on("uncaughtException", function(error, origin) { if (error instanceof Error) { process.send && process.send({ type: "UNCAUGHT_EXCEPTION", payload: { error: { name: error.name, message: error.message, stack: error.stack }, origin }, version: "v1" }); } else { process.send && process.send({ type: "UNCAUGHT_EXCEPTION", payload: { error: { name: "Error", message: typeof error === "string" ? error : JSON.stringify(error) }, origin }, version: "v1" }); } });
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// <define:__PROJECT_CONFIG__>
var define_PROJECT_CONFIG_default;
var init_define_PROJECT_CONFIG = __esm({
  "<define:__PROJECT_CONFIG__>"() {
    define_PROJECT_CONFIG_default = { project: "proj_wlvanvtxvnxlxewmqfbh", retries: { enabledInDev: true, default: { maxAttempts: 3, factor: 2, minTimeoutInMs: 1e3, maxTimeoutInMs: 1e4, randomize: true } }, logLevel: "log", triggerDirectories: [], triggerUrl: "https://api.trigger.dev", projectDir: "/Users/ashrafelshaer/Desktop/Developer/hr-toolkit-v1/packages/jobs", tsconfigPath: "/Users/ashrafelshaer/Desktop/Developer/hr-toolkit-v1/packages/jobs/tsconfig.json", additionalFiles: [] };
  }
});

// ../../node_modules/@trigger.dev/core/dist/v3/index.js
var require_v3 = __commonJS({
  "../../node_modules/@trigger.dev/core/dist/v3/index.js"(exports2) {
    "use strict";
    init_define_PROJECT_CONFIG();
    var api = require("@opentelemetry/api");
    var zod = require("zod");
    var zodValidationError = require("zod-validation-error");
    var preciseDate = require("@google-cloud/precise-date");
    var apiLogs = require("@opentelemetry/api-logs");
    var humanizeDuration = require("humanize-duration");
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var humanizeDuration__default = /* @__PURE__ */ _interopDefault(humanizeDuration);
    var __defProp2 = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    var __accessCheck = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    var __privateAdd = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    var __privateMethod = (obj, member, method) => {
      __accessCheck(obj, member, "access private method");
      return method;
    };
    var version2 = "3.0.0-beta.55";
    var dependencies = {
      "@google-cloud/precise-date": "^4.0.0",
      "@opentelemetry/api": "^1.8.0",
      "@opentelemetry/api-logs": "^0.48.0",
      "@opentelemetry/exporter-logs-otlp-http": "^0.49.1",
      "@opentelemetry/exporter-trace-otlp-http": "^0.49.1",
      "@opentelemetry/instrumentation": "^0.49.1",
      "@opentelemetry/resources": "^1.22.0",
      "@opentelemetry/sdk-logs": "^0.49.1",
      "@opentelemetry/sdk-node": "^0.49.1",
      "@opentelemetry/sdk-trace-base": "^1.22.0",
      "@opentelemetry/sdk-trace-node": "^1.22.0",
      "@opentelemetry/semantic-conventions": "^1.22.0",
      "humanize-duration": "^3.27.3",
      "socket.io-client": "4.7.5",
      superjson: "^2.2.1",
      ulidx: "^2.2.1",
      zod: "3.22.3",
      "zod-error": "1.5.0",
      "zod-validation-error": "^1.5.0"
    };
    var CreateAuthorizationCodeResponseSchema = zod.z.object({
      url: zod.z.string().url(),
      authorizationCode: zod.z.string()
    });
    var GetPersonalAccessTokenRequestSchema = zod.z.object({
      authorizationCode: zod.z.string()
    });
    var GetPersonalAccessTokenResponseSchema = zod.z.object({
      token: zod.z.object({
        token: zod.z.string(),
        obfuscatedToken: zod.z.string()
      }).nullable()
    });
    var MachineCpu = zod.z.union([
      zod.z.literal(0.25),
      zod.z.literal(0.5),
      zod.z.literal(1),
      zod.z.literal(2),
      zod.z.literal(4)
    ]);
    var MachineMemory = zod.z.union([
      zod.z.literal(0.25),
      zod.z.literal(0.5),
      zod.z.literal(1),
      zod.z.literal(2),
      zod.z.literal(4),
      zod.z.literal(8)
    ]);
    var MachinePresetName = zod.z.enum([
      "micro",
      "small-1x",
      "small-2x",
      "medium-1x",
      "medium-2x",
      "large-1x",
      "large-2x"
    ]);
    var MachineConfig = zod.z.object({
      cpu: MachineCpu.optional(),
      memory: MachineMemory.optional(),
      preset: MachinePresetName.optional()
    });
    var MachinePreset = zod.z.object({
      name: MachinePresetName,
      cpu: zod.z.number(),
      memory: zod.z.number(),
      centsPerMs: zod.z.number()
    });
    var TaskRunBuiltInError = zod.z.object({
      type: zod.z.literal("BUILT_IN_ERROR"),
      name: zod.z.string(),
      message: zod.z.string(),
      stackTrace: zod.z.string()
    });
    var TaskRunCustomErrorObject = zod.z.object({
      type: zod.z.literal("CUSTOM_ERROR"),
      raw: zod.z.string()
    });
    var TaskRunStringError = zod.z.object({
      type: zod.z.literal("STRING_ERROR"),
      raw: zod.z.string()
    });
    var TaskRunErrorCodes2 = {
      COULD_NOT_FIND_EXECUTOR: "COULD_NOT_FIND_EXECUTOR",
      COULD_NOT_FIND_TASK: "COULD_NOT_FIND_TASK",
      CONFIGURED_INCORRECTLY: "CONFIGURED_INCORRECTLY",
      TASK_ALREADY_RUNNING: "TASK_ALREADY_RUNNING",
      TASK_EXECUTION_FAILED: "TASK_EXECUTION_FAILED",
      TASK_EXECUTION_ABORTED: "TASK_EXECUTION_ABORTED",
      TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE: "TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE",
      TASK_PROCESS_SIGKILL_TIMEOUT: "TASK_PROCESS_SIGKILL_TIMEOUT",
      TASK_RUN_CANCELLED: "TASK_RUN_CANCELLED",
      TASK_OUTPUT_ERROR: "TASK_OUTPUT_ERROR",
      HANDLE_ERROR_ERROR: "HANDLE_ERROR_ERROR",
      GRACEFUL_EXIT_TIMEOUT: "GRACEFUL_EXIT_TIMEOUT",
      TASK_RUN_CRASHED: "TASK_RUN_CRASHED"
    };
    var TaskRunInternalError = zod.z.object({
      type: zod.z.literal("INTERNAL_ERROR"),
      code: zod.z.enum([
        "COULD_NOT_FIND_EXECUTOR",
        "COULD_NOT_FIND_TASK",
        "CONFIGURED_INCORRECTLY",
        "TASK_ALREADY_RUNNING",
        "TASK_EXECUTION_FAILED",
        "TASK_EXECUTION_ABORTED",
        "TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE",
        "TASK_PROCESS_SIGKILL_TIMEOUT",
        "TASK_RUN_CANCELLED",
        "TASK_OUTPUT_ERROR",
        "HANDLE_ERROR_ERROR",
        "GRACEFUL_EXIT_TIMEOUT",
        "TASK_RUN_HEARTBEAT_TIMEOUT",
        "TASK_RUN_CRASHED"
      ]),
      message: zod.z.string().optional(),
      stackTrace: zod.z.string().optional()
    });
    var TaskRunError = zod.z.discriminatedUnion("type", [
      TaskRunBuiltInError,
      TaskRunCustomErrorObject,
      TaskRunStringError,
      TaskRunInternalError
    ]);
    var TaskRun = zod.z.object({
      id: zod.z.string(),
      payload: zod.z.string(),
      payloadType: zod.z.string(),
      context: zod.z.any(),
      tags: zod.z.array(zod.z.string()),
      isTest: zod.z.boolean().default(false),
      createdAt: zod.z.coerce.date(),
      startedAt: zod.z.coerce.date().default(() => /* @__PURE__ */ new Date()),
      idempotencyKey: zod.z.string().optional(),
      maxAttempts: zod.z.number().optional(),
      durationMs: zod.z.number().default(0),
      costInCents: zod.z.number().default(0),
      baseCostInCents: zod.z.number().default(0),
      version: zod.z.string().optional()
    });
    var TaskRunExecutionTask = zod.z.object({
      id: zod.z.string(),
      filePath: zod.z.string(),
      exportName: zod.z.string()
    });
    var TaskRunExecutionAttempt = zod.z.object({
      id: zod.z.string(),
      number: zod.z.number(),
      startedAt: zod.z.coerce.date(),
      backgroundWorkerId: zod.z.string(),
      backgroundWorkerTaskId: zod.z.string(),
      status: zod.z.string()
    });
    var TaskRunExecutionEnvironment = zod.z.object({
      id: zod.z.string(),
      slug: zod.z.string(),
      type: zod.z.enum([
        "PRODUCTION",
        "STAGING",
        "DEVELOPMENT",
        "PREVIEW"
      ])
    });
    var TaskRunExecutionOrganization = zod.z.object({
      id: zod.z.string(),
      slug: zod.z.string(),
      name: zod.z.string()
    });
    var TaskRunExecutionProject = zod.z.object({
      id: zod.z.string(),
      ref: zod.z.string(),
      slug: zod.z.string(),
      name: zod.z.string()
    });
    var TaskRunExecutionQueue = zod.z.object({
      id: zod.z.string(),
      name: zod.z.string()
    });
    var TaskRunExecutionBatch = zod.z.object({
      id: zod.z.string()
    });
    var TaskRunExecution = zod.z.object({
      task: TaskRunExecutionTask,
      attempt: TaskRunExecutionAttempt,
      run: TaskRun,
      queue: TaskRunExecutionQueue,
      environment: TaskRunExecutionEnvironment,
      organization: TaskRunExecutionOrganization,
      project: TaskRunExecutionProject,
      batch: TaskRunExecutionBatch.optional(),
      machine: MachinePreset.optional()
    });
    var TaskRunContext = zod.z.object({
      task: TaskRunExecutionTask,
      attempt: TaskRunExecutionAttempt.omit({
        backgroundWorkerId: true,
        backgroundWorkerTaskId: true
      }),
      run: TaskRun.omit({
        payload: true,
        payloadType: true
      }),
      queue: TaskRunExecutionQueue,
      environment: TaskRunExecutionEnvironment,
      organization: TaskRunExecutionOrganization,
      project: TaskRunExecutionProject,
      batch: TaskRunExecutionBatch.optional(),
      machine: MachinePreset.optional()
    });
    var TaskRunExecutionRetry = zod.z.object({
      timestamp: zod.z.number(),
      delay: zod.z.number(),
      error: zod.z.unknown().optional()
    });
    var TaskRunExecutionUsage = zod.z.object({
      durationMs: zod.z.number()
    });
    var TaskRunFailedExecutionResult = zod.z.object({
      ok: zod.z.literal(false),
      id: zod.z.string(),
      error: TaskRunError,
      retry: TaskRunExecutionRetry.optional(),
      skippedRetrying: zod.z.boolean().optional(),
      usage: TaskRunExecutionUsage.optional()
    });
    var TaskRunSuccessfulExecutionResult = zod.z.object({
      ok: zod.z.literal(true),
      id: zod.z.string(),
      output: zod.z.string().optional(),
      outputType: zod.z.string(),
      usage: TaskRunExecutionUsage.optional()
    });
    var TaskRunExecutionResult = zod.z.discriminatedUnion("ok", [
      TaskRunSuccessfulExecutionResult,
      TaskRunFailedExecutionResult
    ]);
    var BatchTaskRunExecutionResult = zod.z.object({
      id: zod.z.string(),
      items: TaskRunExecutionResult.array()
    });
    var EnvironmentType = zod.z.enum([
      "PRODUCTION",
      "STAGING",
      "DEVELOPMENT",
      "PREVIEW"
    ]);
    var TaskRunExecutionPayload = zod.z.object({
      execution: TaskRunExecution,
      traceContext: zod.z.record(zod.z.unknown()),
      environment: zod.z.record(zod.z.string()).optional()
    });
    var ProdTaskRunExecution = TaskRunExecution.extend({
      worker: zod.z.object({
        id: zod.z.string(),
        contentHash: zod.z.string(),
        version: zod.z.string()
      }),
      machine: MachinePreset.default({
        name: "small-1x",
        cpu: 1,
        memory: 1,
        centsPerMs: 0
      })
    });
    var ProdTaskRunExecutionPayload = zod.z.object({
      execution: ProdTaskRunExecution,
      traceContext: zod.z.record(zod.z.unknown()),
      environment: zod.z.record(zod.z.string()).optional()
    });
    var FixedWindowRateLimit = zod.z.object({
      type: zod.z.literal("fixed-window"),
      limit: zod.z.number(),
      window: zod.z.union([
        zod.z.object({
          seconds: zod.z.number()
        }),
        zod.z.object({
          minutes: zod.z.number()
        }),
        zod.z.object({
          hours: zod.z.number()
        })
      ])
    });
    var SlidingWindowRateLimit = zod.z.object({
      type: zod.z.literal("sliding-window"),
      limit: zod.z.number(),
      window: zod.z.union([
        zod.z.object({
          seconds: zod.z.number()
        }),
        zod.z.object({
          minutes: zod.z.number()
        }),
        zod.z.object({
          hours: zod.z.number()
        })
      ])
    });
    var RateLimitOptions = zod.z.discriminatedUnion("type", [
      FixedWindowRateLimit,
      SlidingWindowRateLimit
    ]);
    var RetryOptions = zod.z.object({
      /** The number of attempts before giving up */
      maxAttempts: zod.z.number().int().optional(),
      /** The exponential factor to use when calculating the next retry time.
      *
      * Each subsequent retry will be calculated as `previousTimeout * factor`
      */
      factor: zod.z.number().optional(),
      /** The minimum time to wait before retrying */
      minTimeoutInMs: zod.z.number().int().optional(),
      /** The maximum time to wait before retrying */
      maxTimeoutInMs: zod.z.number().int().optional(),
      /** Randomize the timeout between retries.
      *
      * This can be useful to prevent the thundering herd problem where all retries happen at the same time.
      */
      randomize: zod.z.boolean().optional()
    });
    var QueueOptions = zod.z.object({
      /** You can define a shared queue and then pass the name in to your task.
         * 
         * @example
         * 
         * ```ts
         * const myQueue = queue({
            name: "my-queue",
            concurrencyLimit: 1,
          });
      
          export const task1 = task({
            id: "task-1",
            queue: {
              name: "my-queue",
            },
            run: async (payload: { message: string }) => {
              // ...
            },
          });
      
          export const task2 = task({
            id: "task-2",
            queue: {
              name: "my-queue",
            },
            run: async (payload: { message: string }) => {
              // ...
            },
          });
         * ```
         */
      name: zod.z.string().optional(),
      /** An optional property that specifies the maximum number of concurrent run executions.
      *
      * If this property is omitted, the task can potentially use up the full concurrency of an environment. */
      concurrencyLimit: zod.z.number().int().min(0).max(1e3).optional(),
      /** @deprecated This feature is coming soon */
      rateLimit: RateLimitOptions.optional()
    });
    var ScheduleMetadata = zod.z.object({
      cron: zod.z.string(),
      timezone: zod.z.string()
    });
    var TaskMetadata = zod.z.object({
      id: zod.z.string(),
      packageVersion: zod.z.string(),
      queue: QueueOptions.optional(),
      retry: RetryOptions.optional(),
      machine: MachineConfig.optional(),
      triggerSource: zod.z.string().optional(),
      schedule: ScheduleMetadata.optional()
    });
    var TaskFileMetadata = zod.z.object({
      filePath: zod.z.string(),
      exportName: zod.z.string()
    });
    var TaskMetadataWithFilePath = zod.z.object({
      id: zod.z.string(),
      packageVersion: zod.z.string(),
      queue: QueueOptions.optional(),
      retry: RetryOptions.optional(),
      machine: MachineConfig.optional(),
      triggerSource: zod.z.string().optional(),
      schedule: ScheduleMetadata.optional(),
      filePath: zod.z.string(),
      exportName: zod.z.string()
    });
    var PostStartCauses = zod.z.enum([
      "index",
      "create",
      "restore"
    ]);
    var PreStopCauses = zod.z.enum([
      "terminate"
    ]);
    var RegexSchema = zod.z.custom((val) => {
      try {
        return typeof val.test === "function";
      } catch {
        return false;
      }
    });
    var Config = zod.z.object({
      project: zod.z.string(),
      triggerDirectories: zod.z.string().array().optional(),
      triggerUrl: zod.z.string().optional(),
      projectDir: zod.z.string().optional(),
      tsconfigPath: zod.z.string().optional(),
      retries: zod.z.object({
        enabledInDev: zod.z.boolean().default(true),
        default: RetryOptions.optional()
      }).optional(),
      additionalPackages: zod.z.string().array().optional(),
      additionalFiles: zod.z.string().array().optional(),
      dependenciesToBundle: zod.z.array(zod.z.union([
        zod.z.string(),
        RegexSchema
      ])).optional(),
      logLevel: zod.z.string().optional(),
      enableConsoleLogging: zod.z.boolean().optional(),
      postInstall: zod.z.string().optional(),
      extraCACerts: zod.z.string().optional()
    });
    var WaitReason = zod.z.enum([
      "WAIT_FOR_DURATION",
      "WAIT_FOR_TASK",
      "WAIT_FOR_BATCH"
    ]);
    var TaskRunExecutionLazyAttemptPayload = zod.z.object({
      runId: zod.z.string(),
      attemptCount: zod.z.number().optional(),
      messageId: zod.z.string(),
      isTest: zod.z.boolean(),
      traceContext: zod.z.record(zod.z.unknown()),
      environment: zod.z.record(zod.z.string()).optional()
    });
    var TaskResource = zod.z.object({
      id: zod.z.string(),
      filePath: zod.z.string(),
      exportName: zod.z.string(),
      queue: QueueOptions.optional(),
      retry: RetryOptions.optional(),
      machine: MachineConfig.optional(),
      triggerSource: zod.z.string().optional(),
      schedule: ScheduleMetadata.optional()
    });
    var BackgroundWorkerMetadata = zod.z.object({
      packageVersion: zod.z.string(),
      contentHash: zod.z.string(),
      cliPackageVersion: zod.z.string().optional(),
      tasks: zod.z.array(TaskResource)
    });
    var ImageDetailsMetadata = zod.z.object({
      contentHash: zod.z.string(),
      imageTag: zod.z.string()
    });
    var _AbortTaskRunError = class _AbortTaskRunError extends Error {
      constructor(message) {
        super(message);
        this.name = "AbortTaskRunError";
      }
    };
    __name(_AbortTaskRunError, "AbortTaskRunError");
    var AbortTaskRunError = _AbortTaskRunError;
    function parseError(error) {
      if (error instanceof Error) {
        return {
          type: "BUILT_IN_ERROR",
          name: error.name,
          message: error.message,
          stackTrace: error.stack ?? ""
        };
      }
      if (typeof error === "string") {
        return {
          type: "STRING_ERROR",
          raw: error
        };
      }
      try {
        return {
          type: "CUSTOM_ERROR",
          raw: JSON.stringify(error)
        };
      } catch (e) {
        return {
          type: "CUSTOM_ERROR",
          raw: String(error)
        };
      }
    }
    __name(parseError, "parseError");
    function createErrorTaskError(error) {
      switch (error.type) {
        case "BUILT_IN_ERROR": {
          const e = new Error(error.message);
          e.name = error.name;
          e.stack = error.stackTrace;
          return e;
        }
        case "STRING_ERROR": {
          return error.raw;
        }
        case "CUSTOM_ERROR": {
          return JSON.parse(error.raw);
        }
        case "INTERNAL_ERROR": {
          return new Error(`trigger.dev internal error (${error.code})`);
        }
      }
    }
    __name(createErrorTaskError, "createErrorTaskError");
    var SerializedError = zod.z.object({
      message: zod.z.string(),
      name: zod.z.string().optional(),
      stackTrace: zod.z.string().optional()
    });
    function createJsonErrorObject(error) {
      switch (error.type) {
        case "BUILT_IN_ERROR": {
          return {
            name: error.name,
            message: error.message,
            stackTrace: error.stackTrace
          };
        }
        case "STRING_ERROR": {
          return {
            message: error.raw
          };
        }
        case "CUSTOM_ERROR": {
          return {
            message: error.raw
          };
        }
        case "INTERNAL_ERROR": {
          return {
            message: `trigger.dev internal error (${error.code})`
          };
        }
      }
    }
    __name(createJsonErrorObject, "createJsonErrorObject");
    function sanitizeError(error) {
      switch (error.type) {
        case "BUILT_IN_ERROR": {
          return {
            type: "BUILT_IN_ERROR",
            message: error.message?.replace(/\0/g, ""),
            name: error.name?.replace(/\0/g, ""),
            stackTrace: error.stackTrace?.replace(/\0/g, "")
          };
        }
        case "STRING_ERROR": {
          return {
            type: "STRING_ERROR",
            raw: error.raw.replace(/\0/g, "")
          };
        }
        case "CUSTOM_ERROR": {
          return {
            type: "CUSTOM_ERROR",
            raw: error.raw.replace(/\0/g, "")
          };
        }
        case "INTERNAL_ERROR": {
          return {
            type: "INTERNAL_ERROR",
            code: error.code,
            message: error.message?.replace(/\0/g, ""),
            stackTrace: error.stackTrace?.replace(/\0/g, "")
          };
        }
      }
    }
    __name(sanitizeError, "sanitizeError");
    function correctErrorStackTrace(stackTrace, projectDir, options) {
      const [errorLine, ...traceLines] = stackTrace.split("\n");
      return [
        options?.removeFirstLine ? void 0 : errorLine,
        ...traceLines.map((line) => correctStackTraceLine(line, projectDir, options?.isDev))
      ].filter(Boolean).join("\n");
    }
    __name(correctErrorStackTrace, "correctErrorStackTrace");
    var LINES_TO_IGNORE = [
      /ConsoleInterceptor/,
      /TriggerTracer/,
      /TaskExecutor/,
      /EXECUTE_TASK_RUN/,
      /@trigger.dev\/core/,
      /packages\/core\/src\/v3/,
      /safeJsonProcess/,
      /__entryPoint.ts/,
      /ZodIpc/,
      /startActiveSpan/,
      /processTicksAndRejections/
    ];
    function correctStackTraceLine(line, projectDir, isDev) {
      if (LINES_TO_IGNORE.some((regex) => regex.test(line))) {
        return;
      }
      if (isDev && projectDir && !line.includes(projectDir)) {
        return;
      }
      return line.trim();
    }
    __name(correctStackTraceLine, "correctStackTraceLine");
    function groupTaskMetadataIssuesByTask(tasks, issues) {
      return issues.reduce((acc, issue) => {
        if (issue.path.length === 0) {
          return acc;
        }
        const taskIndex = issue.path[1];
        if (typeof taskIndex !== "number") {
          return acc;
        }
        const task = tasks[taskIndex];
        if (!task) {
          return acc;
        }
        const restOfPath = issue.path.slice(2);
        const taskId = task.id;
        const taskName = task.exportName;
        const filePath = task.filePath;
        const key = taskIndex;
        const existing = acc[key] ?? {
          id: taskId,
          exportName: taskName,
          filePath,
          issues: []
        };
        existing.issues.push({
          message: issue.message,
          path: restOfPath.length === 0 ? void 0 : restOfPath.join(".")
        });
        return {
          ...acc,
          [key]: existing
        };
      }, {});
    }
    __name(groupTaskMetadataIssuesByTask, "groupTaskMetadataIssuesByTask");
    var WhoAmIResponseSchema = zod.z.object({
      userId: zod.z.string(),
      email: zod.z.string().email(),
      dashboardUrl: zod.z.string()
    });
    var GetProjectResponseBody = zod.z.object({
      id: zod.z.string(),
      externalRef: zod.z.string(),
      name: zod.z.string(),
      slug: zod.z.string(),
      createdAt: zod.z.coerce.date(),
      organization: zod.z.object({
        id: zod.z.string(),
        title: zod.z.string(),
        slug: zod.z.string(),
        createdAt: zod.z.coerce.date()
      })
    });
    var GetProjectsResponseBody = zod.z.array(GetProjectResponseBody);
    var GetProjectEnvResponse = zod.z.object({
      apiKey: zod.z.string(),
      name: zod.z.string(),
      apiUrl: zod.z.string()
    });
    var CreateBackgroundWorkerRequestBody = zod.z.object({
      localOnly: zod.z.boolean(),
      metadata: BackgroundWorkerMetadata,
      supportsLazyAttempts: zod.z.boolean().optional()
    });
    var CreateBackgroundWorkerResponse = zod.z.object({
      id: zod.z.string(),
      version: zod.z.string(),
      contentHash: zod.z.string()
    });
    var RunTag = zod.z.string().max(64, "Tags must be less than 64 characters");
    var RunTags = zod.z.union([
      RunTag,
      RunTag.array()
    ]);
    var TriggerTaskRequestBody = zod.z.object({
      payload: zod.z.any(),
      context: zod.z.any(),
      options: zod.z.object({
        dependentAttempt: zod.z.string().optional(),
        dependentBatch: zod.z.string().optional(),
        lockToVersion: zod.z.string().optional(),
        queue: QueueOptions.optional(),
        concurrencyKey: zod.z.string().optional(),
        idempotencyKey: zod.z.string().optional(),
        test: zod.z.boolean().optional(),
        payloadType: zod.z.string().optional(),
        delay: zod.z.string().or(zod.z.coerce.date()).optional(),
        ttl: zod.z.string().or(zod.z.number().nonnegative().int()).optional(),
        tags: RunTags.optional(),
        maxAttempts: zod.z.number().int().optional()
      }).optional()
    });
    var TriggerTaskResponse = zod.z.object({
      id: zod.z.string()
    });
    var BatchTriggerTaskRequestBody = zod.z.object({
      items: TriggerTaskRequestBody.array(),
      dependentAttempt: zod.z.string().optional()
    });
    var BatchTriggerTaskResponse = zod.z.object({
      batchId: zod.z.string(),
      runs: zod.z.string().array()
    });
    var GetBatchResponseBody = zod.z.object({
      id: zod.z.string(),
      items: zod.z.array(zod.z.object({
        id: zod.z.string(),
        taskRunId: zod.z.string(),
        status: zod.z.enum([
          "PENDING",
          "CANCELED",
          "COMPLETED",
          "FAILED"
        ])
      }))
    });
    var AddTagsRequestBody = zod.z.object({
      tags: RunTags
    });
    var RescheduleRunRequestBody = zod.z.object({
      delay: zod.z.string().or(zod.z.coerce.date())
    });
    var GetEnvironmentVariablesResponseBody = zod.z.object({
      variables: zod.z.record(zod.z.string())
    });
    var StartDeploymentIndexingRequestBody = zod.z.object({
      imageReference: zod.z.string(),
      selfHosted: zod.z.boolean().optional()
    });
    var StartDeploymentIndexingResponseBody = zod.z.object({
      id: zod.z.string(),
      contentHash: zod.z.string()
    });
    var ExternalBuildData = zod.z.object({
      buildId: zod.z.string(),
      buildToken: zod.z.string(),
      projectId: zod.z.string()
    });
    var InitializeDeploymentResponseBody = zod.z.object({
      id: zod.z.string(),
      contentHash: zod.z.string(),
      shortCode: zod.z.string(),
      version: zod.z.string(),
      imageTag: zod.z.string(),
      externalBuildData: ExternalBuildData.optional().nullable(),
      registryHost: zod.z.string().optional()
    });
    var InitializeDeploymentRequestBody = zod.z.object({
      contentHash: zod.z.string(),
      userId: zod.z.string().optional()
    });
    var DeploymentErrorData = zod.z.object({
      name: zod.z.string(),
      message: zod.z.string(),
      stack: zod.z.string().optional(),
      stderr: zod.z.string().optional()
    });
    var GetDeploymentResponseBody = zod.z.object({
      id: zod.z.string(),
      status: zod.z.enum([
        "PENDING",
        "BUILDING",
        "DEPLOYING",
        "DEPLOYED",
        "FAILED",
        "CANCELED",
        "TIMED_OUT"
      ]),
      contentHash: zod.z.string(),
      shortCode: zod.z.string(),
      version: zod.z.string(),
      imageReference: zod.z.string().optional(),
      errorData: DeploymentErrorData.optional().nullable(),
      worker: zod.z.object({
        id: zod.z.string(),
        version: zod.z.string(),
        tasks: zod.z.array(zod.z.object({
          id: zod.z.string(),
          slug: zod.z.string(),
          filePath: zod.z.string(),
          exportName: zod.z.string()
        }))
      }).optional()
    });
    var CreateUploadPayloadUrlResponseBody = zod.z.object({
      presignedUrl: zod.z.string()
    });
    var ReplayRunResponse = zod.z.object({
      id: zod.z.string()
    });
    var CanceledRunResponse = zod.z.object({
      id: zod.z.string()
    });
    var ScheduleType = zod.z.union([
      zod.z.literal("DECLARATIVE"),
      zod.z.literal("IMPERATIVE")
    ]);
    var ScheduledTaskPayload = zod.z.object({
      /** The schedule id associated with this run (you can have many schedules for the same task).
      You can use this to remove the schedule, update it, etc */
      scheduleId: zod.z.string(),
      /** The type of schedule – `"DECLARATIVE"` or `"IMPERATIVE"`.
      *
      * **DECLARATIVE** – defined inline on your `schedules.task` using the `cron` property. They can only be created, updated or deleted by modifying the `cron` property on your task.
      *
      * **IMPERATIVE** – created using the `schedules.create` functions or in the dashboard.
      */
      type: ScheduleType,
      /** When the task was scheduled to run.
      * Note this will be slightly different from `new Date()` because it takes a few ms to run the task.
      * 
      * This date is UTC. To output it as a string with a timezone you would do this: 
      * ```ts
      * const formatted = payload.timestamp.toLocaleString("en-US", {
           timeZone: payload.timezone,
       });
       ```  */
      timestamp: zod.z.date(),
      /** When the task was last run (it has been).
      This can be undefined if it's never been run. This date is UTC. */
      lastTimestamp: zod.z.date().optional(),
      /** You can optionally provide an external id when creating the schedule.
      Usually you would use a userId or some other unique identifier.
      This defaults to undefined if you didn't provide one. */
      externalId: zod.z.string().optional(),
      /** The IANA timezone the schedule is set to. The default is UTC.
      * You can see the full list of supported timezones here: https://cloud.trigger.dev/timezones
      */
      timezone: zod.z.string(),
      /** The next 5 dates this task is scheduled to run */
      upcoming: zod.z.array(zod.z.date())
    });
    var CreateScheduleOptions = zod.z.object({
      /** The id of the task you want to attach to. */
      task: zod.z.string(),
      /**  The schedule in CRON format.
         * 
         * ```txt
      *    *    *    *    *    *
      ┬    ┬    ┬    ┬    ┬
      │    │    │    │    |
      │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
      │    │    │    └───── month (1 - 12)
      │    │    └────────── day of month (1 - 31, L)
      │    └─────────────── hour (0 - 23)
      └──────────────────── minute (0 - 59)
         * ```
      
      "L" means the last. In the "day of week" field, 1L means the last Monday of the month. In the day of month field, L means the last day of the month.
      
         */
      cron: zod.z.string(),
      /** You can only create one schedule with this key. If you use it twice, the second call will update the schedule.
      *
      * This is required to prevent you from creating duplicate schedules. */
      deduplicationKey: zod.z.string(),
      /** Optionally, you can specify your own IDs (like a user ID) and then use it inside the run function of your task.
      *
      * This allows you to have per-user CRON tasks.
      */
      externalId: zod.z.string().optional(),
      /** Optionally, you can specify a timezone in the IANA format. If unset it will use UTC.
      * If specified then the CRON will be evaluated in that timezone and will respect daylight savings.
      *
      * If you set the CRON to `0 0 * * *` and the timezone to `America/New_York` then the task will run at midnight in New York time, no matter whether it's daylight savings or not.
      *
      * You can see the full list of supported timezones here: https://cloud.trigger.dev/timezones
      *
      * @example "America/New_York", "Europe/London", "Asia/Tokyo", "Africa/Cairo"
      *
      */
      timezone: zod.z.string().optional()
    });
    var UpdateScheduleOptions = CreateScheduleOptions.omit({
      deduplicationKey: true
    });
    var ScheduleGenerator = zod.z.object({
      type: zod.z.literal("CRON"),
      expression: zod.z.string(),
      description: zod.z.string()
    });
    var ScheduleObject = zod.z.object({
      id: zod.z.string(),
      type: ScheduleType,
      task: zod.z.string(),
      active: zod.z.boolean(),
      deduplicationKey: zod.z.string().nullish(),
      externalId: zod.z.string().nullish(),
      generator: ScheduleGenerator,
      timezone: zod.z.string(),
      nextRun: zod.z.coerce.date().nullish(),
      environments: zod.z.array(zod.z.object({
        id: zod.z.string(),
        type: zod.z.string(),
        userName: zod.z.string().nullish()
      }))
    });
    var DeletedScheduleObject = zod.z.object({
      id: zod.z.string()
    });
    var ListSchedulesResult = zod.z.object({
      data: zod.z.array(ScheduleObject),
      pagination: zod.z.object({
        currentPage: zod.z.number(),
        totalPages: zod.z.number(),
        count: zod.z.number()
      })
    });
    var ListScheduleOptions = zod.z.object({
      page: zod.z.number().optional(),
      perPage: zod.z.number().optional()
    });
    var TimezonesResult = zod.z.object({
      timezones: zod.z.array(zod.z.string())
    });
    var RunStatus = zod.z.enum([
      /// Task hasn't been deployed yet but is waiting to be executed
      "WAITING_FOR_DEPLOY",
      /// Task is waiting to be executed by a worker
      "QUEUED",
      /// Task is currently being executed by a worker
      "EXECUTING",
      /// Task has failed and is waiting to be retried
      "REATTEMPTING",
      /// Task has been paused by the system, and will be resumed by the system
      "FROZEN",
      /// Task has been completed successfully
      "COMPLETED",
      /// Task has been canceled by the user
      "CANCELED",
      /// Task has been completed with errors
      "FAILED",
      /// Task has crashed and won't be retried, most likely the worker ran out of resources, e.g. memory or storage
      "CRASHED",
      /// Task was interrupted during execution, mostly this happens in development environments
      "INTERRUPTED",
      /// Task has failed to complete, due to an error in the system
      "SYSTEM_FAILURE",
      /// Task has been scheduled to run at a specific time
      "DELAYED",
      /// Task has expired and won't be executed
      "EXPIRED"
    ]);
    var AttemptStatus = zod.z.enum([
      "PENDING",
      "EXECUTING",
      "PAUSED",
      "COMPLETED",
      "FAILED",
      "CANCELED"
    ]);
    var RunEnvironmentDetails = zod.z.object({
      id: zod.z.string(),
      name: zod.z.string(),
      user: zod.z.string().optional()
    });
    var RunScheduleDetails = zod.z.object({
      id: zod.z.string(),
      externalId: zod.z.string().optional(),
      deduplicationKey: zod.z.string().optional(),
      generator: ScheduleGenerator
    });
    var CommonRunFields = {
      id: zod.z.string(),
      status: RunStatus,
      taskIdentifier: zod.z.string(),
      idempotencyKey: zod.z.string().optional(),
      version: zod.z.string().optional(),
      isQueued: zod.z.boolean(),
      isExecuting: zod.z.boolean(),
      isCompleted: zod.z.boolean(),
      isSuccess: zod.z.boolean(),
      isFailed: zod.z.boolean(),
      isCancelled: zod.z.boolean(),
      isTest: zod.z.boolean(),
      createdAt: zod.z.coerce.date(),
      updatedAt: zod.z.coerce.date(),
      startedAt: zod.z.coerce.date().optional(),
      finishedAt: zod.z.coerce.date().optional(),
      delayedUntil: zod.z.coerce.date().optional(),
      ttl: zod.z.string().optional(),
      expiredAt: zod.z.coerce.date().optional(),
      tags: zod.z.string().array(),
      costInCents: zod.z.number(),
      baseCostInCents: zod.z.number(),
      durationMs: zod.z.number()
    };
    var RetrieveRunResponse = zod.z.object({
      ...CommonRunFields,
      payload: zod.z.any().optional(),
      payloadPresignedUrl: zod.z.string().optional(),
      output: zod.z.any().optional(),
      outputPresignedUrl: zod.z.string().optional(),
      schedule: RunScheduleDetails.optional(),
      attempts: zod.z.array(zod.z.object({
        id: zod.z.string(),
        status: AttemptStatus,
        createdAt: zod.z.coerce.date(),
        updatedAt: zod.z.coerce.date(),
        startedAt: zod.z.coerce.date().optional(),
        completedAt: zod.z.coerce.date().optional(),
        error: SerializedError.optional()
      }).optional())
    });
    var ListRunResponseItem = zod.z.object({
      ...CommonRunFields,
      env: RunEnvironmentDetails
    });
    var ListRunResponse = zod.z.object({
      data: zod.z.array(ListRunResponseItem),
      pagination: zod.z.object({
        next: zod.z.string().optional(),
        previous: zod.z.string().optional()
      })
    });
    var CreateEnvironmentVariableRequestBody = zod.z.object({
      name: zod.z.string(),
      value: zod.z.string()
    });
    var UpdateEnvironmentVariableRequestBody = zod.z.object({
      value: zod.z.string()
    });
    var ImportEnvironmentVariablesRequestBody = zod.z.object({
      variables: zod.z.record(zod.z.string()),
      override: zod.z.boolean().optional()
    });
    var EnvironmentVariableResponseBody = zod.z.object({
      success: zod.z.boolean()
    });
    var EnvironmentVariableValue = zod.z.object({
      value: zod.z.string()
    });
    var EnvironmentVariable = zod.z.object({
      name: zod.z.string(),
      value: zod.z.string()
    });
    var EnvironmentVariables = zod.z.array(EnvironmentVariable);
    var BackgroundWorkerServerMessages = zod.z.discriminatedUnion("type", [
      zod.z.object({
        type: zod.z.literal("EXECUTE_RUNS"),
        payloads: zod.z.array(TaskRunExecutionPayload)
      }),
      zod.z.object({
        type: zod.z.literal("CANCEL_ATTEMPT"),
        taskAttemptId: zod.z.string(),
        taskRunId: zod.z.string()
      }),
      zod.z.object({
        type: zod.z.literal("SCHEDULE_ATTEMPT"),
        image: zod.z.string(),
        version: zod.z.string(),
        machine: MachinePreset,
        nextAttemptNumber: zod.z.number().optional(),
        // identifiers
        id: zod.z.string().optional(),
        envId: zod.z.string(),
        envType: EnvironmentType,
        orgId: zod.z.string(),
        projectId: zod.z.string(),
        runId: zod.z.string()
      }),
      zod.z.object({
        type: zod.z.literal("EXECUTE_RUN_LAZY_ATTEMPT"),
        payload: TaskRunExecutionLazyAttemptPayload
      })
    ]);
    var serverWebsocketMessages = {
      SERVER_READY: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        id: zod.z.string()
      }),
      BACKGROUND_WORKER_MESSAGE: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        backgroundWorkerId: zod.z.string(),
        data: BackgroundWorkerServerMessages
      })
    };
    var BackgroundWorkerClientMessages = zod.z.discriminatedUnion("type", [
      zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        type: zod.z.literal("TASK_RUN_COMPLETED"),
        completion: TaskRunExecutionResult,
        execution: TaskRunExecution
      }),
      zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        type: zod.z.literal("TASK_RUN_FAILED_TO_RUN"),
        completion: TaskRunFailedExecutionResult
      }),
      zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        type: zod.z.literal("TASK_HEARTBEAT"),
        id: zod.z.string()
      }),
      zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        type: zod.z.literal("TASK_RUN_HEARTBEAT"),
        id: zod.z.string()
      })
    ]);
    var BackgroundWorkerProperties = zod.z.object({
      id: zod.z.string(),
      version: zod.z.string(),
      contentHash: zod.z.string()
    });
    var clientWebsocketMessages = {
      READY_FOR_TASKS: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        backgroundWorkerId: zod.z.string(),
        inProgressRuns: zod.z.string().array().optional()
      }),
      BACKGROUND_WORKER_DEPRECATED: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        backgroundWorkerId: zod.z.string()
      }),
      BACKGROUND_WORKER_MESSAGE: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        backgroundWorkerId: zod.z.string(),
        data: BackgroundWorkerClientMessages
      })
    };
    var workerToChildMessages2 = {
      EXECUTE_TASK_RUN: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        execution: TaskRunExecution,
        traceContext: zod.z.record(zod.z.unknown()),
        metadata: BackgroundWorkerProperties
      }),
      TASK_RUN_COMPLETED_NOTIFICATION: zod.z.discriminatedUnion("version", [
        zod.z.object({
          version: zod.z.literal("v1"),
          completion: TaskRunExecutionResult,
          execution: TaskRunExecution
        }),
        zod.z.object({
          version: zod.z.literal("v2"),
          completion: TaskRunExecutionResult
        })
      ]),
      CLEANUP: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        flush: zod.z.boolean().default(false),
        kill: zod.z.boolean().default(true)
      })
    };
    var UncaughtExceptionMessage = zod.z.object({
      version: zod.z.literal("v1").default("v1"),
      error: zod.z.object({
        name: zod.z.string(),
        message: zod.z.string(),
        stack: zod.z.string().optional()
      }),
      origin: zod.z.enum([
        "uncaughtException",
        "unhandledRejection"
      ])
    });
    var TaskMetadataFailedToParseData = zod.z.object({
      version: zod.z.literal("v1").default("v1"),
      tasks: zod.z.unknown(),
      zodIssues: zod.z.custom((v) => {
        return Array.isArray(v) && v.every((issue) => typeof issue === "object" && "message" in issue);
      })
    });
    var childToWorkerMessages2 = {
      TASK_RUN_COMPLETED: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        execution: TaskRunExecution,
        result: TaskRunExecutionResult
      }),
      TASKS_READY: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        tasks: TaskMetadataWithFilePath.array()
      }),
      TASKS_FAILED_TO_PARSE: TaskMetadataFailedToParseData,
      TASK_HEARTBEAT: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        id: zod.z.string()
      }),
      TASK_RUN_HEARTBEAT: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        id: zod.z.string()
      }),
      READY_TO_DISPOSE: zod.z.undefined(),
      WAIT_FOR_DURATION: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        ms: zod.z.number()
      }),
      WAIT_FOR_TASK: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        id: zod.z.string()
      }),
      WAIT_FOR_BATCH: zod.z.object({
        version: zod.z.literal("v1").default("v1"),
        id: zod.z.string(),
        runs: zod.z.string().array()
      }),
      UNCAUGHT_EXCEPTION: UncaughtExceptionMessage
    };
    var ProdChildToWorkerMessages = {
      TASK_RUN_COMPLETED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          execution: TaskRunExecution,
          result: TaskRunExecutionResult
        })
      },
      TASKS_READY: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          tasks: TaskMetadataWithFilePath.array()
        })
      },
      TASKS_FAILED_TO_PARSE: {
        message: TaskMetadataFailedToParseData
      },
      TASK_HEARTBEAT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          id: zod.z.string()
        })
      },
      READY_TO_DISPOSE: {
        message: zod.z.undefined()
      },
      WAIT_FOR_DURATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          ms: zod.z.number(),
          now: zod.z.number(),
          waitThresholdInMs: zod.z.number()
        })
      },
      WAIT_FOR_TASK: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          friendlyId: zod.z.string()
        })
      },
      WAIT_FOR_BATCH: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          batchFriendlyId: zod.z.string(),
          runFriendlyIds: zod.z.string().array()
        })
      },
      UNCAUGHT_EXCEPTION: {
        message: UncaughtExceptionMessage
      }
    };
    var ProdWorkerToChildMessages = {
      EXECUTE_TASK_RUN: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          execution: TaskRunExecution,
          traceContext: zod.z.record(zod.z.unknown()),
          metadata: BackgroundWorkerProperties
        })
      },
      TASK_RUN_COMPLETED_NOTIFICATION: {
        message: zod.z.discriminatedUnion("version", [
          zod.z.object({
            version: zod.z.literal("v1"),
            completion: TaskRunExecutionResult,
            execution: TaskRunExecution
          }),
          zod.z.object({
            version: zod.z.literal("v2"),
            completion: TaskRunExecutionResult
          })
        ])
      },
      CLEANUP: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          flush: zod.z.boolean().default(false),
          kill: zod.z.boolean().default(true)
        }),
        callback: zod.z.void()
      },
      WAIT_COMPLETED_NOTIFICATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1")
        })
      }
    };
    var ProviderToPlatformMessages = {
      LOG: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          data: zod.z.string()
        })
      },
      LOG_WITH_ACK: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          data: zod.z.string()
        }),
        callback: zod.z.object({
          status: zod.z.literal("ok")
        })
      },
      WORKER_CRASHED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          reason: zod.z.string().optional(),
          exitCode: zod.z.number().optional(),
          message: zod.z.string().optional(),
          logs: zod.z.string().optional(),
          overrideCompletion: zod.z.boolean().optional()
        })
      },
      INDEXING_FAILED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          deploymentId: zod.z.string(),
          error: zod.z.object({
            name: zod.z.string(),
            message: zod.z.string(),
            stack: zod.z.string().optional(),
            stderr: zod.z.string().optional()
          }),
          overrideCompletion: zod.z.boolean().optional()
        })
      }
    };
    var PlatformToProviderMessages = {
      INDEX: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          imageTag: zod.z.string(),
          shortCode: zod.z.string(),
          apiKey: zod.z.string(),
          apiUrl: zod.z.string(),
          // identifiers
          envId: zod.z.string(),
          envType: EnvironmentType,
          orgId: zod.z.string(),
          projectId: zod.z.string(),
          deploymentId: zod.z.string()
        }),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false),
            error: zod.z.object({
              name: zod.z.string(),
              message: zod.z.string(),
              stack: zod.z.string().optional(),
              stderr: zod.z.string().optional()
            })
          }),
          zod.z.object({
            success: zod.z.literal(true)
          })
        ])
      },
      RESTORE: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          type: zod.z.enum([
            "DOCKER",
            "KUBERNETES"
          ]),
          location: zod.z.string(),
          reason: zod.z.string().optional(),
          imageRef: zod.z.string(),
          attemptNumber: zod.z.number().optional(),
          machine: MachinePreset,
          // identifiers
          checkpointId: zod.z.string(),
          envId: zod.z.string(),
          envType: EnvironmentType,
          orgId: zod.z.string(),
          projectId: zod.z.string(),
          runId: zod.z.string()
        })
      },
      PRE_PULL_DEPLOYMENT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          imageRef: zod.z.string(),
          shortCode: zod.z.string(),
          // identifiers
          envId: zod.z.string(),
          envType: EnvironmentType,
          orgId: zod.z.string(),
          projectId: zod.z.string(),
          deploymentId: zod.z.string()
        })
      }
    };
    var CreateWorkerMessage = zod.z.object({
      projectRef: zod.z.string(),
      envId: zod.z.string(),
      deploymentId: zod.z.string(),
      metadata: zod.z.object({
        cliPackageVersion: zod.z.string().optional(),
        contentHash: zod.z.string(),
        packageVersion: zod.z.string(),
        tasks: TaskResource.array()
      })
    });
    var CoordinatorToPlatformMessages = {
      LOG: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          metadata: zod.z.any(),
          text: zod.z.string()
        })
      },
      CREATE_WORKER: {
        message: zod.z.discriminatedUnion("version", [
          CreateWorkerMessage.extend({
            version: zod.z.literal("v1")
          }),
          CreateWorkerMessage.extend({
            version: zod.z.literal("v2"),
            supportsLazyAttempts: zod.z.boolean()
          })
        ]),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false)
          }),
          zod.z.object({
            success: zod.z.literal(true)
          })
        ])
      },
      CREATE_TASK_RUN_ATTEMPT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          envId: zod.z.string()
        }),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false),
            reason: zod.z.string().optional()
          }),
          zod.z.object({
            success: zod.z.literal(true),
            executionPayload: ProdTaskRunExecutionPayload
          })
        ])
      },
      // Deprecated: Only workers without lazy attempt support will use this
      READY_FOR_EXECUTION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          totalCompletions: zod.z.number()
        }),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false)
          }),
          zod.z.object({
            success: zod.z.literal(true),
            payload: ProdTaskRunExecutionPayload
          })
        ])
      },
      READY_FOR_LAZY_ATTEMPT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          envId: zod.z.string(),
          totalCompletions: zod.z.number()
        }),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false),
            reason: zod.z.string().optional()
          }),
          zod.z.object({
            success: zod.z.literal(true),
            lazyPayload: TaskRunExecutionLazyAttemptPayload
          })
        ])
      },
      READY_FOR_RESUME: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptFriendlyId: zod.z.string(),
          type: WaitReason
        })
      },
      TASK_RUN_COMPLETED: {
        message: zod.z.object({
          version: zod.z.enum([
            "v1",
            "v2"
          ]).default("v1"),
          execution: ProdTaskRunExecution,
          completion: TaskRunExecutionResult,
          checkpoint: zod.z.object({
            docker: zod.z.boolean(),
            location: zod.z.string()
          }).optional()
        })
      },
      TASK_RUN_FAILED_TO_RUN: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          completion: TaskRunFailedExecutionResult
        })
      },
      TASK_HEARTBEAT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptFriendlyId: zod.z.string()
        })
      },
      TASK_RUN_HEARTBEAT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string()
        })
      },
      CHECKPOINT_CREATED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptFriendlyId: zod.z.string(),
          docker: zod.z.boolean(),
          location: zod.z.string(),
          reason: zod.z.discriminatedUnion("type", [
            zod.z.object({
              type: zod.z.literal("WAIT_FOR_DURATION"),
              ms: zod.z.number(),
              now: zod.z.number()
            }),
            zod.z.object({
              type: zod.z.literal("WAIT_FOR_BATCH"),
              batchFriendlyId: zod.z.string(),
              runFriendlyIds: zod.z.string().array()
            }),
            zod.z.object({
              type: zod.z.literal("WAIT_FOR_TASK"),
              friendlyId: zod.z.string()
            }),
            zod.z.object({
              type: zod.z.literal("RETRYING_AFTER_FAILURE"),
              attemptNumber: zod.z.number()
            })
          ])
        }),
        callback: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          keepRunAlive: zod.z.boolean()
        })
      },
      INDEXING_FAILED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          deploymentId: zod.z.string(),
          error: zod.z.object({
            name: zod.z.string(),
            message: zod.z.string(),
            stack: zod.z.string().optional(),
            stderr: zod.z.string().optional()
          })
        })
      },
      RUN_CRASHED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          error: zod.z.object({
            name: zod.z.string(),
            message: zod.z.string(),
            stack: zod.z.string().optional()
          })
        })
      }
    };
    var PlatformToCoordinatorMessages = {
      RESUME_AFTER_DEPENDENCY: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          attemptId: zod.z.string(),
          attemptFriendlyId: zod.z.string(),
          completions: TaskRunExecutionResult.array(),
          executions: TaskRunExecution.array()
        })
      },
      RESUME_AFTER_DURATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptId: zod.z.string(),
          attemptFriendlyId: zod.z.string()
        })
      },
      REQUEST_ATTEMPT_CANCELLATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptId: zod.z.string(),
          attemptFriendlyId: zod.z.string()
        })
      },
      REQUEST_RUN_CANCELLATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          delayInMs: zod.z.number().optional()
        })
      },
      READY_FOR_RETRY: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string()
        })
      },
      DYNAMIC_CONFIG: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          checkpointThresholdInMs: zod.z.number()
        })
      }
    };
    var ClientToSharedQueueMessages = {
      READY_FOR_TASKS: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          backgroundWorkerId: zod.z.string()
        })
      },
      BACKGROUND_WORKER_DEPRECATED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          backgroundWorkerId: zod.z.string()
        })
      },
      BACKGROUND_WORKER_MESSAGE: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          backgroundWorkerId: zod.z.string(),
          data: BackgroundWorkerClientMessages
        })
      }
    };
    var SharedQueueToClientMessages = {
      SERVER_READY: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          id: zod.z.string()
        })
      },
      BACKGROUND_WORKER_MESSAGE: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          backgroundWorkerId: zod.z.string(),
          data: BackgroundWorkerServerMessages
        })
      }
    };
    var IndexTasksMessage = zod.z.object({
      version: zod.z.literal("v1"),
      deploymentId: zod.z.string(),
      tasks: TaskResource.array(),
      packageVersion: zod.z.string()
    });
    var ProdWorkerToCoordinatorMessages = {
      TEST: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1")
        }),
        callback: zod.z.void()
      },
      INDEX_TASKS: {
        message: zod.z.discriminatedUnion("version", [
          IndexTasksMessage.extend({
            version: zod.z.literal("v1")
          }),
          IndexTasksMessage.extend({
            version: zod.z.literal("v2"),
            supportsLazyAttempts: zod.z.boolean()
          })
        ]),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false)
          }),
          zod.z.object({
            success: zod.z.literal(true)
          })
        ])
      },
      // Deprecated: Only workers without lazy attempt support will use this
      READY_FOR_EXECUTION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          totalCompletions: zod.z.number()
        })
      },
      READY_FOR_LAZY_ATTEMPT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string(),
          totalCompletions: zod.z.number()
        })
      },
      READY_FOR_RESUME: {
        message: zod.z.discriminatedUnion("version", [
          zod.z.object({
            version: zod.z.literal("v1"),
            attemptFriendlyId: zod.z.string(),
            type: WaitReason
          }),
          zod.z.object({
            version: zod.z.literal("v2"),
            attemptFriendlyId: zod.z.string(),
            attemptNumber: zod.z.number(),
            type: WaitReason
          })
        ])
      },
      READY_FOR_CHECKPOINT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1")
        })
      },
      CANCEL_CHECKPOINT: {
        message: zod.z.discriminatedUnion("version", [
          zod.z.object({
            version: zod.z.literal("v1")
          }),
          zod.z.object({
            version: zod.z.literal("v2"),
            reason: WaitReason.optional()
          })
        ]).default({
          version: "v1"
        }),
        callback: zod.z.object({
          version: zod.z.literal("v2").default("v2"),
          checkpointCanceled: zod.z.boolean(),
          reason: WaitReason.optional()
        })
      },
      TASK_HEARTBEAT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptFriendlyId: zod.z.string()
        })
      },
      TASK_RUN_HEARTBEAT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string()
        })
      },
      TASK_RUN_COMPLETED: {
        message: zod.z.object({
          version: zod.z.enum([
            "v1",
            "v2"
          ]).default("v1"),
          execution: ProdTaskRunExecution,
          completion: TaskRunExecutionResult
        }),
        callback: zod.z.object({
          willCheckpointAndRestore: zod.z.boolean(),
          shouldExit: zod.z.boolean()
        })
      },
      TASK_RUN_FAILED_TO_RUN: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          completion: TaskRunFailedExecutionResult
        })
      },
      WAIT_FOR_DURATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          ms: zod.z.number(),
          now: zod.z.number(),
          attemptFriendlyId: zod.z.string()
        }),
        callback: zod.z.object({
          willCheckpointAndRestore: zod.z.boolean()
        })
      },
      WAIT_FOR_TASK: {
        message: zod.z.object({
          version: zod.z.enum([
            "v1",
            "v2"
          ]).default("v1"),
          friendlyId: zod.z.string(),
          // This is the attempt that is waiting
          attemptFriendlyId: zod.z.string()
        }),
        callback: zod.z.object({
          willCheckpointAndRestore: zod.z.boolean()
        })
      },
      WAIT_FOR_BATCH: {
        message: zod.z.object({
          version: zod.z.enum([
            "v1",
            "v2"
          ]).default("v1"),
          batchFriendlyId: zod.z.string(),
          runFriendlyIds: zod.z.string().array(),
          // This is the attempt that is waiting
          attemptFriendlyId: zod.z.string()
        }),
        callback: zod.z.object({
          willCheckpointAndRestore: zod.z.boolean()
        })
      },
      INDEXING_FAILED: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          deploymentId: zod.z.string(),
          error: zod.z.object({
            name: zod.z.string(),
            message: zod.z.string(),
            stack: zod.z.string().optional(),
            stderr: zod.z.string().optional()
          })
        })
      },
      CREATE_TASK_RUN_ATTEMPT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string()
        }),
        callback: zod.z.discriminatedUnion("success", [
          zod.z.object({
            success: zod.z.literal(false),
            reason: zod.z.string().optional()
          }),
          zod.z.object({
            success: zod.z.literal(true),
            executionPayload: ProdTaskRunExecutionPayload
          })
        ])
      },
      UNRECOVERABLE_ERROR: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          error: zod.z.object({
            name: zod.z.string(),
            message: zod.z.string(),
            stack: zod.z.string().optional()
          })
        })
      },
      SET_STATE: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptFriendlyId: zod.z.string().optional(),
          attemptNumber: zod.z.string().optional()
        })
      }
    };
    var CoordinatorToProdWorkerMessages = {
      RESUME_AFTER_DEPENDENCY: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptId: zod.z.string(),
          completions: TaskRunExecutionResult.array(),
          executions: TaskRunExecution.array()
        })
      },
      RESUME_AFTER_DURATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptId: zod.z.string()
        })
      },
      // Deprecated: Only workers without lazy attempt support will use this
      EXECUTE_TASK_RUN: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          executionPayload: ProdTaskRunExecutionPayload
        })
      },
      EXECUTE_TASK_RUN_LAZY_ATTEMPT: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          lazyPayload: TaskRunExecutionLazyAttemptPayload
        })
      },
      REQUEST_ATTEMPT_CANCELLATION: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          attemptId: zod.z.string()
        })
      },
      REQUEST_EXIT: {
        message: zod.z.discriminatedUnion("version", [
          zod.z.object({
            version: zod.z.literal("v1")
          }),
          zod.z.object({
            version: zod.z.literal("v2"),
            delayInMs: zod.z.number().optional()
          })
        ])
      },
      READY_FOR_RETRY: {
        message: zod.z.object({
          version: zod.z.literal("v1").default("v1"),
          runId: zod.z.string()
        })
      }
    };
    var ProdWorkerSocketData = zod.z.object({
      contentHash: zod.z.string(),
      projectRef: zod.z.string(),
      envId: zod.z.string(),
      runId: zod.z.string(),
      attemptFriendlyId: zod.z.string().optional(),
      attemptNumber: zod.z.string().optional(),
      podName: zod.z.string(),
      deploymentId: zod.z.string(),
      deploymentVersion: zod.z.string()
    });
    var CoordinatorSocketData = zod.z.object({
      supportsDynamicConfig: zod.z.string().optional()
    });
    var PRIMARY_VARIANT = "primary";
    var Variant = zod.z.enum([
      PRIMARY_VARIANT
    ]);
    var AccessoryItem = zod.z.object({
      text: zod.z.string(),
      variant: zod.z.string().optional(),
      url: zod.z.string().optional()
    });
    var Accessory = zod.z.object({
      items: zod.z.array(AccessoryItem),
      style: zod.z.enum([
        "codepath"
      ]).optional()
    });
    var TaskEventStyle = zod.z.object({
      icon: zod.z.string().optional(),
      variant: Variant.optional(),
      accessory: Accessory.optional()
    }).default({
      icon: void 0,
      variant: void 0
    });
    var stringPatternMatchers = [
      zod.z.object({
        $endsWith: zod.z.string()
      }),
      zod.z.object({
        $startsWith: zod.z.string()
      }),
      zod.z.object({
        $ignoreCaseEquals: zod.z.string()
      })
    ];
    var EventMatcher = zod.z.union([
      /** Match against a string */
      zod.z.array(zod.z.string()),
      /** Match against a number */
      zod.z.array(zod.z.number()),
      /** Match against a boolean */
      zod.z.array(zod.z.boolean()),
      zod.z.array(zod.z.union([
        ...stringPatternMatchers,
        zod.z.object({
          $exists: zod.z.boolean()
        }),
        zod.z.object({
          $isNull: zod.z.boolean()
        }),
        zod.z.object({
          $anythingBut: zod.z.union([
            zod.z.string(),
            zod.z.number(),
            zod.z.boolean()
          ])
        }),
        zod.z.object({
          $anythingBut: zod.z.union([
            zod.z.array(zod.z.string()),
            zod.z.array(zod.z.number()),
            zod.z.array(zod.z.boolean())
          ])
        }),
        zod.z.object({
          $gt: zod.z.number()
        }),
        zod.z.object({
          $lt: zod.z.number()
        }),
        zod.z.object({
          $gte: zod.z.number()
        }),
        zod.z.object({
          $lte: zod.z.number()
        }),
        zod.z.object({
          $between: zod.z.tuple([
            zod.z.number(),
            zod.z.number()
          ])
        }),
        zod.z.object({
          $includes: zod.z.union([
            zod.z.string(),
            zod.z.number(),
            zod.z.boolean()
          ])
        }),
        zod.z.object({
          $not: zod.z.union([
            zod.z.string(),
            zod.z.number(),
            zod.z.boolean()
          ])
        })
      ]))
    ]);
    var EventFilter = zod.z.lazy(() => zod.z.record(zod.z.union([
      EventMatcher,
      EventFilter
    ])));
    var FetchRetryHeadersStrategy = zod.z.object({
      /** The `headers` strategy retries the request using info from the response headers. */
      strategy: zod.z.literal("headers"),
      /** The header to use to determine the maximum number of times to retry the request. */
      limitHeader: zod.z.string(),
      /** The header to use to determine the number of remaining retries. */
      remainingHeader: zod.z.string(),
      /** The header to use to determine the time when the number of remaining retries will be reset. */
      resetHeader: zod.z.string(),
      /** The event filter to use to determine if the request should be retried. */
      bodyFilter: EventFilter.optional(),
      /** The format of the `resetHeader` value. */
      resetFormat: zod.z.enum([
        "unix_timestamp",
        "unix_timestamp_in_ms",
        "iso_8601",
        "iso_8601_duration_openai_variant"
      ]).default("unix_timestamp").optional()
    });
    var FetchRetryBackoffStrategy = RetryOptions.extend({
      /** The `backoff` strategy retries the request with an exponential backoff. */
      strategy: zod.z.literal("backoff"),
      /** The event filter to use to determine if the request should be retried. */
      bodyFilter: EventFilter.optional()
    });
    var FetchRetryStrategy = zod.z.discriminatedUnion("strategy", [
      FetchRetryHeadersStrategy,
      FetchRetryBackoffStrategy
    ]);
    var FetchRetryByStatusOptions = zod.z.record(zod.z.string(), FetchRetryStrategy);
    var FetchTimeoutOptions = zod.z.object({
      /** The maximum time to wait for the request to complete. */
      durationInMs: zod.z.number().optional(),
      retry: RetryOptions.optional()
    });
    var FetchRetryOptions = zod.z.object({
      /** The retrying strategy for specific status codes. */
      byStatus: FetchRetryByStatusOptions.optional(),
      /** The timeout options for the request. */
      timeout: RetryOptions.optional(),
      /**
      * The retrying strategy for connection errors.
      */
      connectionError: RetryOptions.optional()
    });
    var ExceptionEventProperties = zod.z.object({
      type: zod.z.string().optional(),
      message: zod.z.string().optional(),
      stacktrace: zod.z.string().optional()
    });
    var ExceptionSpanEvent = zod.z.object({
      name: zod.z.literal("exception"),
      time: zod.z.coerce.date(),
      properties: zod.z.object({
        exception: ExceptionEventProperties
      })
    });
    var CancellationSpanEvent = zod.z.object({
      name: zod.z.literal("cancellation"),
      time: zod.z.coerce.date(),
      properties: zod.z.object({
        reason: zod.z.string()
      })
    });
    var OtherSpanEvent = zod.z.object({
      name: zod.z.string(),
      time: zod.z.coerce.date(),
      properties: zod.z.record(zod.z.unknown())
    });
    var SpanEvent = zod.z.union([
      ExceptionSpanEvent,
      CancellationSpanEvent,
      OtherSpanEvent
    ]);
    var SpanEvents = zod.z.array(SpanEvent);
    function isExceptionSpanEvent(event) {
      return event.name === "exception";
    }
    __name(isExceptionSpanEvent, "isExceptionSpanEvent");
    function isCancellationSpanEvent(event) {
      return event.name === "cancellation";
    }
    __name(isCancellationSpanEvent, "isCancellationSpanEvent");
    var SpanMessagingEvent = zod.z.object({
      system: zod.z.string().optional(),
      client_id: zod.z.string().optional(),
      operation: zod.z.enum([
        "publish",
        "create",
        "receive",
        "deliver"
      ]),
      message: zod.z.any(),
      destination: zod.z.string().optional()
    });
    var _globalThis = typeof globalThis === "object" ? globalThis : global;
    var GLOBAL_TRIGGER_DOT_DEV_KEY = Symbol.for(`dev.trigger.ts.api`);
    var _global = _globalThis;
    function registerGlobal(type, instance, allowOverride = false) {
      const api2 = _global[GLOBAL_TRIGGER_DOT_DEV_KEY] = _global[GLOBAL_TRIGGER_DOT_DEV_KEY] ?? {};
      if (!allowOverride && api2[type]) {
        return false;
      }
      api2[type] = instance;
      return true;
    }
    __name(registerGlobal, "registerGlobal");
    function getGlobal(type) {
      return _global[GLOBAL_TRIGGER_DOT_DEV_KEY]?.[type];
    }
    __name(getGlobal, "getGlobal");
    function unregisterGlobal(type) {
      const api2 = _global[GLOBAL_TRIGGER_DOT_DEV_KEY];
      if (api2) {
        delete api2[type];
      }
    }
    __name(unregisterGlobal, "unregisterGlobal");
    var SemanticInternalAttributes = {
      ENVIRONMENT_ID: "ctx.environment.id",
      ENVIRONMENT_TYPE: "ctx.environment.type",
      ORGANIZATION_ID: "ctx.organization.id",
      ORGANIZATION_SLUG: "ctx.organization.slug",
      ORGANIZATION_NAME: "ctx.organization.name",
      PROJECT_ID: "ctx.project.id",
      PROJECT_REF: "ctx.project.ref",
      PROJECT_NAME: "ctx.project.title",
      PROJECT_DIR: "project.dir",
      ATTEMPT_ID: "ctx.attempt.id",
      ATTEMPT_NUMBER: "ctx.attempt.number",
      RUN_ID: "ctx.run.id",
      RUN_IS_TEST: "ctx.run.isTest",
      BATCH_ID: "ctx.batch.id",
      TASK_SLUG: "ctx.task.id",
      TASK_PATH: "ctx.task.filePath",
      TASK_EXPORT_NAME: "ctx.task.exportName",
      QUEUE_NAME: "ctx.queue.name",
      QUEUE_ID: "ctx.queue.id",
      MACHINE_PRESET_NAME: "ctx.machine.name",
      MACHINE_PRESET_CPU: "ctx.machine.cpu",
      MACHINE_PRESET_MEMORY: "ctx.machine.memory",
      MACHINE_PRESET_CENTS_PER_MS: "ctx.machine.centsPerMs",
      SPAN_PARTIAL: "$span.partial",
      SPAN_ID: "$span.span_id",
      OUTPUT: "$output",
      OUTPUT_TYPE: "$mime_type_output",
      STYLE: "$style",
      STYLE_ICON: "$style.icon",
      STYLE_VARIANT: "$style.variant",
      STYLE_ACCESSORY: "$style.accessory",
      METADATA: "$metadata",
      TRIGGER: "$trigger",
      PAYLOAD: "$payload",
      PAYLOAD_TYPE: "$mime_type_payload",
      SHOW: "$show",
      SHOW_ACTIONS: "$show.actions",
      WORKER_ID: "worker.id",
      WORKER_VERSION: "worker.version",
      CLI_VERSION: "cli.version",
      SDK_VERSION: "sdk.version",
      SDK_LANGUAGE: "sdk.language",
      RETRY_AT: "retry.at",
      RETRY_DELAY: "retry.delay",
      RETRY_COUNT: "retry.count",
      LINK_TITLE: "$link.title",
      IDEMPOTENCY_KEY: "ctx.run.idempotencyKey",
      USAGE_DURATION_MS: "$usage.durationMs",
      USAGE_COST_IN_CENTS: "$usage.costInCents",
      RATE_LIMIT_LIMIT: "response.rateLimit.limit",
      RATE_LIMIT_REMAINING: "response.rateLimit.remaining",
      RATE_LIMIT_RESET: "response.rateLimit.reset"
    };
    var API_NAME = "task-context";
    var _getTaskContext;
    var getTaskContext_fn;
    var _TaskContextAPI = class _TaskContextAPI2 {
      constructor() {
        __privateAdd(this, _getTaskContext);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TaskContextAPI2();
        }
        return this._instance;
      }
      get isInsideTask() {
        return __privateMethod(this, _getTaskContext, getTaskContext_fn).call(this) !== void 0;
      }
      get ctx() {
        return __privateMethod(this, _getTaskContext, getTaskContext_fn).call(this)?.ctx;
      }
      get worker() {
        return __privateMethod(this, _getTaskContext, getTaskContext_fn).call(this)?.worker;
      }
      get attributes() {
        if (this.ctx) {
          return {
            ...this.contextAttributes,
            ...this.workerAttributes
          };
        }
        return {};
      }
      get workerAttributes() {
        if (this.worker) {
          return {
            [SemanticInternalAttributes.WORKER_ID]: this.worker.id,
            [SemanticInternalAttributes.WORKER_VERSION]: this.worker.version
          };
        }
        return {};
      }
      get contextAttributes() {
        if (this.ctx) {
          return {
            [SemanticInternalAttributes.ATTEMPT_ID]: this.ctx.attempt.id,
            [SemanticInternalAttributes.ATTEMPT_NUMBER]: this.ctx.attempt.number,
            [SemanticInternalAttributes.TASK_SLUG]: this.ctx.task.id,
            [SemanticInternalAttributes.TASK_PATH]: this.ctx.task.filePath,
            [SemanticInternalAttributes.TASK_EXPORT_NAME]: this.ctx.task.exportName,
            [SemanticInternalAttributes.QUEUE_NAME]: this.ctx.queue.name,
            [SemanticInternalAttributes.QUEUE_ID]: this.ctx.queue.id,
            [SemanticInternalAttributes.ENVIRONMENT_ID]: this.ctx.environment.id,
            [SemanticInternalAttributes.ENVIRONMENT_TYPE]: this.ctx.environment.type,
            [SemanticInternalAttributes.ORGANIZATION_ID]: this.ctx.organization.id,
            [SemanticInternalAttributes.PROJECT_ID]: this.ctx.project.id,
            [SemanticInternalAttributes.PROJECT_REF]: this.ctx.project.ref,
            [SemanticInternalAttributes.PROJECT_NAME]: this.ctx.project.name,
            [SemanticInternalAttributes.RUN_ID]: this.ctx.run.id,
            [SemanticInternalAttributes.RUN_IS_TEST]: this.ctx.run.isTest,
            [SemanticInternalAttributes.ORGANIZATION_SLUG]: this.ctx.organization.slug,
            [SemanticInternalAttributes.ORGANIZATION_NAME]: this.ctx.organization.name,
            [SemanticInternalAttributes.BATCH_ID]: this.ctx.batch?.id,
            [SemanticInternalAttributes.IDEMPOTENCY_KEY]: this.ctx.run.idempotencyKey,
            [SemanticInternalAttributes.MACHINE_PRESET_NAME]: this.ctx.machine?.name,
            [SemanticInternalAttributes.MACHINE_PRESET_CPU]: this.ctx.machine?.cpu,
            [SemanticInternalAttributes.MACHINE_PRESET_MEMORY]: this.ctx.machine?.memory,
            [SemanticInternalAttributes.MACHINE_PRESET_CENTS_PER_MS]: this.ctx.machine?.centsPerMs
          };
        }
        return {};
      }
      disable() {
        unregisterGlobal(API_NAME);
      }
      setGlobalTaskContext(taskContext2) {
        return registerGlobal(API_NAME, taskContext2);
      }
    };
    _getTaskContext = /* @__PURE__ */ new WeakSet();
    getTaskContext_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME);
    }, "#getTaskContext");
    __name(_TaskContextAPI, "TaskContextAPI");
    var TaskContextAPI = _TaskContextAPI;
    var taskContext = TaskContextAPI.getInstance();
    function calculateResetAt(resets, format, now = /* @__PURE__ */ new Date()) {
      if (!resets)
        return;
      switch (format) {
        case "iso_8601_duration_openai_variant": {
          return calculateISO8601DurationOpenAIVariantResetAt(resets, now);
        }
        case "iso_8601": {
          return calculateISO8601ResetAt(resets, now);
        }
        case "unix_timestamp": {
          return calculateUnixTimestampResetAt(resets, now);
        }
        case "unix_timestamp_in_ms": {
          return calculateUnixTimestampInMsResetAt(resets, now);
        }
      }
    }
    __name(calculateResetAt, "calculateResetAt");
    function calculateUnixTimestampResetAt(resets, now = /* @__PURE__ */ new Date()) {
      if (!resets)
        return void 0;
      const resetAt = parseInt(resets, 10);
      if (isNaN(resetAt))
        return void 0;
      return new Date(resetAt * 1e3);
    }
    __name(calculateUnixTimestampResetAt, "calculateUnixTimestampResetAt");
    function calculateUnixTimestampInMsResetAt(resets, now = /* @__PURE__ */ new Date()) {
      if (!resets)
        return void 0;
      const resetAt = parseInt(resets, 10);
      if (isNaN(resetAt))
        return void 0;
      return new Date(resetAt);
    }
    __name(calculateUnixTimestampInMsResetAt, "calculateUnixTimestampInMsResetAt");
    function calculateISO8601ResetAt(resets, now = /* @__PURE__ */ new Date()) {
      if (!resets)
        return void 0;
      const resetAt = new Date(resets);
      if (isNaN(resetAt.getTime()))
        return void 0;
      return resetAt;
    }
    __name(calculateISO8601ResetAt, "calculateISO8601ResetAt");
    function calculateISO8601DurationOpenAIVariantResetAt(resets, now = /* @__PURE__ */ new Date()) {
      if (!resets)
        return void 0;
      const pattern = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+(?:\.\d+)?)s)?(?:(\d+)ms)?$/;
      const match = resets.match(pattern);
      if (!match)
        return void 0;
      const days = parseInt(match[1], 10) || 0;
      const hours = parseInt(match[2], 10) || 0;
      const minutes = parseInt(match[3], 10) || 0;
      const seconds = parseFloat(match[4]) || 0;
      const milliseconds = parseInt(match[5], 10) || 0;
      const resetAt = new Date(now);
      resetAt.setDate(resetAt.getDate() + days);
      resetAt.setHours(resetAt.getHours() + hours);
      resetAt.setMinutes(resetAt.getMinutes() + minutes);
      resetAt.setSeconds(resetAt.getSeconds() + Math.floor(seconds));
      resetAt.setMilliseconds(resetAt.getMilliseconds() + (seconds - Math.floor(seconds)) * 1e3 + milliseconds);
      return resetAt;
    }
    __name(calculateISO8601DurationOpenAIVariantResetAt, "calculateISO8601DurationOpenAIVariantResetAt");
    var defaultRetryOptions = {
      maxAttempts: 3,
      factor: 2,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 6e4,
      randomize: true
    };
    var defaultFetchRetryOptions = {
      byStatus: {
        "429,408,409,5xx": {
          strategy: "backoff",
          ...defaultRetryOptions
        }
      },
      connectionError: defaultRetryOptions,
      timeout: defaultRetryOptions
    };
    function calculateNextRetryDelay(options, attempt) {
      const opts = {
        ...defaultRetryOptions,
        ...options
      };
      if (attempt >= opts.maxAttempts) {
        return;
      }
      const { factor, minTimeoutInMs, maxTimeoutInMs, randomize } = opts;
      const random = randomize ? Math.random() + 1 : 1;
      const timeout = Math.min(maxTimeoutInMs, random * minTimeoutInMs * Math.pow(factor, attempt - 1));
      return Math.round(timeout);
    }
    __name(calculateNextRetryDelay, "calculateNextRetryDelay");
    function calculateResetAt2(resets, format, now = Date.now()) {
      const resetAt = calculateResetAt(resets, format, new Date(now));
      return resetAt?.getTime();
    }
    __name(calculateResetAt2, "calculateResetAt");
    var _ApiError = class _ApiError2 extends Error {
      constructor(status, error, message, headers) {
        super(`${_ApiError2.makeMessage(status, error, message)}`);
        this.name = "TriggerApiError";
        this.status = status;
        this.headers = headers;
        const data = error;
        this.error = data;
        this.code = data?.["code"];
        this.param = data?.["param"];
        this.type = data?.["type"];
      }
      static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status) {
          return new ApiConnectionError({
            cause: castToError(errorResponse)
          });
        }
        const error = errorResponse?.["error"];
        if (status === 400) {
          return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
          return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
          return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
          return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
          return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
          return new InternalServerError(status, error, message, headers);
        }
        return new _ApiError2(status, error, message, headers);
      }
    };
    __name(_ApiError, "ApiError");
    var ApiError = _ApiError;
    var _ApiConnectionError = class _ApiConnectionError extends ApiError {
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        __publicField(this, "status");
        if (cause)
          this.cause = cause;
      }
    };
    __name(_ApiConnectionError, "ApiConnectionError");
    var ApiConnectionError = _ApiConnectionError;
    var _BadRequestError = class _BadRequestError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 400);
      }
    };
    __name(_BadRequestError, "BadRequestError");
    var BadRequestError = _BadRequestError;
    var _AuthenticationError = class _AuthenticationError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 401);
      }
    };
    __name(_AuthenticationError, "AuthenticationError");
    var AuthenticationError = _AuthenticationError;
    var _PermissionDeniedError = class _PermissionDeniedError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 403);
      }
    };
    __name(_PermissionDeniedError, "PermissionDeniedError");
    var PermissionDeniedError = _PermissionDeniedError;
    var _NotFoundError = class _NotFoundError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 404);
      }
    };
    __name(_NotFoundError, "NotFoundError");
    var NotFoundError = _NotFoundError;
    var _ConflictError = class _ConflictError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 409);
      }
    };
    __name(_ConflictError, "ConflictError");
    var ConflictError = _ConflictError;
    var _UnprocessableEntityError = class _UnprocessableEntityError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 422);
      }
    };
    __name(_UnprocessableEntityError, "UnprocessableEntityError");
    var UnprocessableEntityError = _UnprocessableEntityError;
    var _RateLimitError = class _RateLimitError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 429);
      }
      get millisecondsUntilReset() {
        const resetAtUnixEpochMs = (this.headers ?? {})["x-ratelimit-reset"];
        if (typeof resetAtUnixEpochMs === "string") {
          const resetAtUnixEpoch = parseInt(resetAtUnixEpochMs, 10);
          if (isNaN(resetAtUnixEpoch)) {
            return;
          }
          return Math.max(resetAtUnixEpoch - Date.now() + Math.floor(Math.random() * 2e3), 0);
        }
      }
    };
    __name(_RateLimitError, "RateLimitError");
    var RateLimitError = _RateLimitError;
    var _InternalServerError = class _InternalServerError extends ApiError {
    };
    __name(_InternalServerError, "InternalServerError");
    var InternalServerError = _InternalServerError;
    function castToError(err) {
      if (err instanceof Error)
        return err;
      return new Error(err);
    }
    __name(castToError, "castToError");
    var NULL_SENTINEL = "$@null((";
    function flattenAttributes(obj, prefix) {
      const result = {};
      if (obj === void 0) {
        return result;
      }
      if (obj === null) {
        result[prefix || ""] = NULL_SENTINEL;
        return result;
      }
      if (typeof obj === "string") {
        result[prefix || ""] = obj;
        return result;
      }
      if (typeof obj === "number") {
        result[prefix || ""] = obj;
        return result;
      }
      if (typeof obj === "boolean") {
        result[prefix || ""] = obj;
        return result;
      }
      for (const [key, value] of Object.entries(obj)) {
        const newPrefix = `${prefix ? `${prefix}.` : ""}${Array.isArray(obj) ? `[${key}]` : key}`;
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === "object" && value[i] !== null) {
              Object.assign(result, flattenAttributes(value[i], `${newPrefix}.[${i}]`));
            } else {
              if (value[i] === null) {
                result[`${newPrefix}.[${i}]`] = NULL_SENTINEL;
              } else {
                result[`${newPrefix}.[${i}]`] = value[i];
              }
            }
          }
        } else if (isRecord(value)) {
          Object.assign(result, flattenAttributes(value, newPrefix));
        } else {
          if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
            result[newPrefix] = value;
          } else if (value === null) {
            result[newPrefix] = NULL_SENTINEL;
          }
        }
      }
      return result;
    }
    __name(flattenAttributes, "flattenAttributes");
    function isRecord(value) {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    }
    __name(isRecord, "isRecord");
    function unflattenAttributes(obj) {
      if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        return obj;
      }
      if (typeof obj === "object" && obj !== null && Object.keys(obj).length === 1 && Object.keys(obj)[0] === "") {
        return rehydrateNull(obj[""]);
      }
      if (Object.keys(obj).length === 0) {
        return;
      }
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        const parts = key.split(".").reduce((acc, part) => {
          if (part.includes("[")) {
            const subparts = part.split(/\[|\]/).filter((p) => p !== "");
            acc.push(...subparts);
          } else {
            acc.push(part);
          }
          return acc;
        }, []);
        let current = result;
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          const nextPart = parts[i + 1];
          const isArray = /^\d+$/.test(nextPart);
          if (isArray && !Array.isArray(current[part])) {
            current[part] = [];
          } else if (!isArray && current[part] === void 0) {
            current[part] = {};
          }
          current = current[part];
        }
        const lastPart = parts[parts.length - 1];
        current[lastPart] = rehydrateNull(value);
      }
      if (Object.keys(result).every((k) => /^\d+$/.test(k))) {
        const maxIndex = Math.max(...Object.keys(result).map((k) => parseInt(k)));
        const arrayResult = Array(maxIndex + 1);
        for (const key in result) {
          arrayResult[parseInt(key)] = result[key];
        }
        return arrayResult;
      }
      return result;
    }
    __name(unflattenAttributes, "unflattenAttributes");
    function primitiveValueOrflattenedAttributes(obj, prefix) {
      if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean" || obj === null || obj === void 0) {
        return obj;
      }
      const attributes = flattenAttributes(obj, prefix);
      if (prefix !== void 0 && typeof attributes[prefix] !== "undefined" && attributes[prefix] !== null) {
        return attributes[prefix];
      }
      return attributes;
    }
    __name(primitiveValueOrflattenedAttributes, "primitiveValueOrflattenedAttributes");
    function rehydrateNull(value) {
      if (value === NULL_SENTINEL) {
        return null;
      }
      return value;
    }
    __name(rehydrateNull, "rehydrateNull");
    function accessoryAttributes(accessory) {
      return flattenAttributes(accessory, SemanticInternalAttributes.STYLE_ACCESSORY);
    }
    __name(accessoryAttributes, "accessoryAttributes");
    var _CursorPage = class _CursorPage {
      constructor(data, pagination, pageFetcher) {
        this.pageFetcher = pageFetcher;
        this.data = data;
        this.pagination = pagination;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        return !!this.pagination.next;
      }
      hasPreviousPage() {
        return !!this.pagination.previous;
      }
      getNextPage() {
        if (!this.pagination.next) {
          throw new Error("No next page available");
        }
        return this.pageFetcher({
          after: this.pagination.next
        });
      }
      getPreviousPage() {
        if (!this.pagination.previous) {
          throw new Error("No previous page available");
        }
        return this.pageFetcher({
          before: this.pagination.previous
        });
      }
      async *iterPages() {
        let page = this;
        yield page;
        while (page.hasNextPage()) {
          page = await page.getNextPage();
          yield page;
        }
      }
      async *[Symbol.asyncIterator]() {
        for await (const page of this.iterPages()) {
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      }
    };
    __name(_CursorPage, "CursorPage");
    var CursorPage = _CursorPage;
    var _OffsetLimitPage = class _OffsetLimitPage {
      constructor(data, pagination, pageFetcher) {
        this.pageFetcher = pageFetcher;
        this.data = data;
        this.pagination = pagination;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        return this.pagination.currentPage < this.pagination.totalPages;
      }
      hasPreviousPage() {
        return this.pagination.currentPage > 1;
      }
      getNextPage() {
        if (!this.hasNextPage()) {
          throw new Error("No next page available");
        }
        return this.pageFetcher({
          page: this.pagination.currentPage + 1
        });
      }
      getPreviousPage() {
        if (!this.hasPreviousPage()) {
          throw new Error("No previous page available");
        }
        return this.pageFetcher({
          page: this.pagination.currentPage - 1
        });
      }
      async *iterPages() {
        let page = this;
        yield page;
        while (page.hasNextPage()) {
          page = await page.getNextPage();
          yield page;
        }
      }
      async *[Symbol.asyncIterator]() {
        for await (const page of this.iterPages()) {
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      }
    };
    __name(_OffsetLimitPage, "OffsetLimitPage");
    var OffsetLimitPage = _OffsetLimitPage;
    var defaultRetryOptions2 = {
      maxAttempts: 3,
      factor: 2,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 6e4,
      randomize: false
    };
    var requestOptionsKeys = {
      retry: true
    };
    var isRequestOptions = /* @__PURE__ */ __name((obj) => {
      return typeof obj === "object" && obj !== null && !isEmptyObj(obj) && Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k));
    }, "isRequestOptions");
    function zodfetch(schema, url, requestInit, options) {
      return new ApiPromise(_doZodFetch(schema, url, requestInit, options));
    }
    __name(zodfetch, "zodfetch");
    function zodfetchCursorPage(schema, url, params, requestInit, options) {
      const query = new URLSearchParams(params.query);
      if (params.limit) {
        query.set("page[size]", String(params.limit));
      }
      if (params.after) {
        query.set("page[after]", params.after);
      }
      if (params.before) {
        query.set("page[before]", params.before);
      }
      const cursorPageSchema = zod.z.object({
        data: zod.z.array(schema),
        pagination: zod.z.object({
          next: zod.z.string().optional(),
          previous: zod.z.string().optional()
        })
      });
      const $url = new URL(url);
      $url.search = query.toString();
      const fetchResult = _doZodFetch(cursorPageSchema, $url.href, requestInit, options);
      return new CursorPagePromise(fetchResult, schema, url, params, requestInit, options);
    }
    __name(zodfetchCursorPage, "zodfetchCursorPage");
    function zodfetchOffsetLimitPage(schema, url, params, requestInit, options) {
      const query = new URLSearchParams(params.query);
      if (params.limit) {
        query.set("perPage", String(params.limit));
      }
      if (params.page) {
        query.set("page", String(params.page));
      }
      const offsetLimitPageSchema = zod.z.object({
        data: zod.z.array(schema),
        pagination: zod.z.object({
          currentPage: zod.z.coerce.number(),
          totalPages: zod.z.coerce.number(),
          count: zod.z.coerce.number()
        })
      });
      const $url = new URL(url);
      $url.search = query.toString();
      const fetchResult = _doZodFetch(offsetLimitPageSchema, $url.href, requestInit, options);
      return new OffsetLimitPagePromise(fetchResult, schema, url, params, requestInit, options);
    }
    __name(zodfetchOffsetLimitPage, "zodfetchOffsetLimitPage");
    async function traceZodFetch(params, callback) {
      if (!params.options?.tracer) {
        return callback();
      }
      const url = new URL(params.url);
      const method = params.requestInit?.method ?? "GET";
      const name = params.options.name ?? `${method} ${url.pathname}`;
      return await params.options.tracer.startActiveSpan(name, async (span) => {
        return await callback(span);
      }, {
        attributes: {
          [SemanticInternalAttributes.STYLE_ICON]: params.options?.icon ?? "api",
          ...params.options.attributes
        }
      });
    }
    __name(traceZodFetch, "traceZodFetch");
    async function _doZodFetch(schema, url, requestInit, options) {
      const $requestInit = await requestInit;
      return traceZodFetch({
        url,
        requestInit: $requestInit,
        options
      }, async (span) => {
        const result = await _doZodFetchWithRetries(schema, url, $requestInit, options);
        if (options?.onResponseBody && span) {
          options.onResponseBody(result.data, span);
        }
        return result;
      });
    }
    __name(_doZodFetch, "_doZodFetch");
    async function _doZodFetchWithRetries(schema, url, requestInit, options, attempt = 1) {
      try {
        const response = await fetch(url, requestInitWithCache(requestInit));
        const responseHeaders = createResponseHeaders(response.headers);
        if (!response.ok) {
          const retryResult = shouldRetry(response, attempt, options?.retry);
          if (retryResult.retry) {
            await waitForRetry(url, attempt + 1, retryResult.delay, options, requestInit, response);
            return await _doZodFetchWithRetries(schema, url, requestInit, options, attempt + 1);
          } else {
            const errText = await response.text().catch((e) => castToError2(e).message);
            const errJSON = safeJsonParse(errText);
            const errMessage = errJSON ? void 0 : errText;
            throw ApiError.generate(response.status, errJSON, errMessage, responseHeaders);
          }
        }
        const jsonBody = await response.json();
        const parsedResult = schema.safeParse(jsonBody);
        if (parsedResult.success) {
          return {
            data: parsedResult.data,
            response
          };
        }
        throw zodValidationError.fromZodError(parsedResult.error);
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        if (options?.retry) {
          const retry = {
            ...defaultRetryOptions2,
            ...options.retry
          };
          const delay = calculateNextRetryDelay(retry, attempt);
          if (delay) {
            await waitForRetry(url, attempt + 1, delay, options, requestInit);
            return await _doZodFetchWithRetries(schema, url, requestInit, options, attempt + 1);
          }
        }
        throw new ApiConnectionError({
          cause: castToError2(error)
        });
      }
    }
    __name(_doZodFetchWithRetries, "_doZodFetchWithRetries");
    function castToError2(err) {
      if (err instanceof Error)
        return err;
      return new Error(err);
    }
    __name(castToError2, "castToError");
    function shouldRetry(response, attempt, retryOptions) {
      function shouldRetryForOptions() {
        const retry = {
          ...defaultRetryOptions2,
          ...retryOptions
        };
        const delay = calculateNextRetryDelay(retry, attempt);
        if (delay) {
          return {
            retry: true,
            delay
          };
        } else {
          return {
            retry: false
          };
        }
      }
      __name(shouldRetryForOptions, "shouldRetryForOptions");
      const shouldRetryHeader = response.headers.get("x-should-retry");
      if (shouldRetryHeader === "true")
        return shouldRetryForOptions();
      if (shouldRetryHeader === "false")
        return {
          retry: false
        };
      if (response.status === 408)
        return shouldRetryForOptions();
      if (response.status === 409)
        return shouldRetryForOptions();
      if (response.status === 429) {
        if (attempt >= (typeof retryOptions?.maxAttempts === "number" ? retryOptions?.maxAttempts : 3)) {
          return {
            retry: false
          };
        }
        const resetAtUnixEpochMs = response.headers.get("x-ratelimit-reset");
        if (resetAtUnixEpochMs) {
          const resetAtUnixEpoch = parseInt(resetAtUnixEpochMs, 10);
          const delay = resetAtUnixEpoch - Date.now() + Math.floor(Math.random() * 1e3);
          if (delay > 0) {
            return {
              retry: true,
              delay
            };
          }
        }
        return shouldRetryForOptions();
      }
      if (response.status >= 500)
        return shouldRetryForOptions();
      return {
        retry: false
      };
    }
    __name(shouldRetry, "shouldRetry");
    function safeJsonParse(text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        return void 0;
      }
    }
    __name(safeJsonParse, "safeJsonParse");
    function createResponseHeaders(headers) {
      return new Proxy(Object.fromEntries(
        // @ts-ignore
        headers.entries()
      ), {
        get(target, name) {
          const key = name.toString();
          return target[key.toLowerCase()] || target[key];
        }
      });
    }
    __name(createResponseHeaders, "createResponseHeaders");
    function requestInitWithCache(requestInit) {
      try {
        const withCache = {
          ...requestInit,
          cache: "no-cache"
        };
        const _ = new Request("http://localhost", withCache);
        return withCache;
      } catch (error) {
        return requestInit ?? {};
      }
    }
    __name(requestInitWithCache, "requestInitWithCache");
    var _ApiPromise = class _ApiPromise extends Promise {
      constructor(responsePromise) {
        super((resolve) => {
          resolve(null);
        });
        this.responsePromise = responsePromise;
      }
      /**
      * Gets the raw `Response` instance instead of parsing the response
      * data.
      *
      * If you want to parse the response body but still get the `Response`
      * instance, you can use {@link withResponse()}.
      */
      asResponse() {
        return this.responsePromise.then((p) => p.response);
      }
      /**
      * Gets the parsed response data and the raw `Response` instance.
      *
      * If you just want to get the raw `Response` instance without parsing it,
      * you can use {@link asResponse()}.
      */
      async withResponse() {
        const [data, response] = await Promise.all([
          this.parse(),
          this.asResponse()
        ]);
        return {
          data,
          response
        };
      }
      parse() {
        return this.responsePromise.then((result) => result.data);
      }
      then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.parse().catch(onrejected);
      }
      finally(onfinally) {
        return this.parse().finally(onfinally);
      }
    };
    __name(_ApiPromise, "ApiPromise");
    var ApiPromise = _ApiPromise;
    var _fetchPage;
    var fetchPage_fn;
    var _CursorPagePromise = class _CursorPagePromise extends ApiPromise {
      constructor(result, schema, url, params, requestInit, options) {
        super(result.then((result2) => ({
          data: new CursorPage(result2.data.data, result2.data.pagination, __privateMethod(this, _fetchPage, fetchPage_fn).bind(this)),
          response: result2.response
        })));
        __privateAdd(this, _fetchPage);
        this.schema = schema;
        this.url = url;
        this.params = params;
        this.requestInit = requestInit;
        this.options = options;
      }
      /**
      * Allow auto-paginating iteration on an unawaited list call, eg:
      *
      *    for await (const item of client.items.list()) {
      *      console.log(item)
      *    }
      */
      async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
          yield item;
        }
      }
    };
    _fetchPage = /* @__PURE__ */ new WeakSet();
    fetchPage_fn = /* @__PURE__ */ __name(function(params) {
      return zodfetchCursorPage(this.schema, this.url, {
        ...this.params,
        ...params
      }, this.requestInit, this.options);
    }, "#fetchPage");
    __name(_CursorPagePromise, "CursorPagePromise");
    var CursorPagePromise = _CursorPagePromise;
    var _fetchPage2;
    var fetchPage_fn2;
    var _OffsetLimitPagePromise = class _OffsetLimitPagePromise extends ApiPromise {
      constructor(result, schema, url, params, requestInit, options) {
        super(result.then((result2) => ({
          data: new OffsetLimitPage(result2.data.data, result2.data.pagination, __privateMethod(this, _fetchPage2, fetchPage_fn2).bind(this)),
          response: result2.response
        })));
        __privateAdd(this, _fetchPage2);
        this.schema = schema;
        this.url = url;
        this.params = params;
        this.requestInit = requestInit;
        this.options = options;
      }
      /**
      * Allow auto-paginating iteration on an unawaited list call, eg:
      *
      *    for await (const item of client.items.list()) {
      *      console.log(item)
      *    }
      */
      async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
          yield item;
        }
      }
    };
    _fetchPage2 = /* @__PURE__ */ new WeakSet();
    fetchPage_fn2 = /* @__PURE__ */ __name(function(params1) {
      return zodfetchOffsetLimitPage(this.schema, this.url, {
        ...this.params,
        ...params1
      }, this.requestInit, this.options);
    }, "#fetchPage");
    __name(_OffsetLimitPagePromise, "OffsetLimitPagePromise");
    var OffsetLimitPagePromise = _OffsetLimitPagePromise;
    async function waitForRetry(url, attempt, delay, options, requestInit, response) {
      if (options?.tracer) {
        const method = requestInit?.method ?? "GET";
        return options.tracer.startActiveSpan(response ? `wait after ${response.status}` : `wait after error`, async (span) => {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "wait",
            ...accessoryAttributes({
              items: [
                {
                  text: `retrying ${options?.name ?? method.toUpperCase()} in ${delay}ms`,
                  variant: "normal"
                }
              ],
              style: "codepath"
            })
          }
        });
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    __name(waitForRetry, "waitForRetry");
    function isEmptyObj(obj) {
      if (!obj)
        return true;
      for (const _k in obj)
        return false;
      return true;
    }
    __name(isEmptyObj, "isEmptyObj");
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    __name(hasOwn, "hasOwn");
    var DEFAULT_ZOD_FETCH_OPTIONS = {
      retry: {
        maxAttempts: 3,
        minTimeoutInMs: 1e3,
        maxTimeoutInMs: 3e4,
        factor: 2,
        randomize: false
      }
    };
    var _getHeaders;
    var getHeaders_fn;
    var _ApiClient = class _ApiClient {
      constructor(baseUrl, accessToken, requestOptions = {}) {
        __privateAdd(this, _getHeaders);
        this.accessToken = accessToken;
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.defaultRequestOptions = mergeRequestOptions(DEFAULT_ZOD_FETCH_OPTIONS, requestOptions);
      }
      async getRunResult(runId, requestOptions) {
        try {
          return await zodfetch(TaskRunExecutionResult, `${this.baseUrl}/api/v1/runs/${runId}/result`, {
            method: "GET",
            headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
          }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
        } catch (error) {
          if (error instanceof ApiError) {
            if (error.status === 404) {
              return void 0;
            }
          }
          throw error;
        }
      }
      async getBatchResults(batchId, requestOptions) {
        return await zodfetch(BatchTaskRunExecutionResult, `${this.baseUrl}/api/v1/batches/${batchId}/results`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      triggerTask(taskId, body, options, requestOptions) {
        const encodedTaskId = encodeURIComponent(taskId);
        return zodfetch(TriggerTaskResponse, `${this.baseUrl}/api/v1/tasks/${encodedTaskId}/trigger`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, options?.spanParentAsLink ?? false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      batchTriggerTask(taskId, body, options, requestOptions) {
        const encodedTaskId = encodeURIComponent(taskId);
        return zodfetch(BatchTriggerTaskResponse, `${this.baseUrl}/api/v1/tasks/${encodedTaskId}/batch`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, options?.spanParentAsLink ?? false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      createUploadPayloadUrl(filename, requestOptions) {
        return zodfetch(CreateUploadPayloadUrlResponseBody, `${this.baseUrl}/api/v1/packets/${filename}`, {
          method: "PUT",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      getPayloadUrl(filename, requestOptions) {
        return zodfetch(CreateUploadPayloadUrlResponseBody, `${this.baseUrl}/api/v1/packets/${filename}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      retrieveRun(runId, requestOptions) {
        return zodfetch(RetrieveRunResponse, `${this.baseUrl}/api/v3/runs/${runId}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listRuns(query, requestOptions) {
        const searchParams = createSearchQueryForListRuns(query);
        return zodfetchCursorPage(ListRunResponseItem, `${this.baseUrl}/api/v1/runs`, {
          query: searchParams,
          limit: query?.limit,
          after: query?.after,
          before: query?.before
        }, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listProjectRuns(projectRef, query, requestOptions) {
        const searchParams = createSearchQueryForListRuns(query);
        if (query?.env) {
          searchParams.append("filter[env]", Array.isArray(query.env) ? query.env.join(",") : query.env);
        }
        return zodfetchCursorPage(ListRunResponseItem, `${this.baseUrl}/api/v1/projects/${projectRef}/runs`, {
          query: searchParams,
          limit: query?.limit,
          after: query?.after,
          before: query?.before
        }, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      replayRun(runId, requestOptions) {
        return zodfetch(ReplayRunResponse, `${this.baseUrl}/api/v1/runs/${runId}/replay`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      cancelRun(runId, requestOptions) {
        return zodfetch(CanceledRunResponse, `${this.baseUrl}/api/v2/runs/${runId}/cancel`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      rescheduleRun(runId, body, requestOptions) {
        return zodfetch(RetrieveRunResponse, `${this.baseUrl}/api/v1/runs/${runId}/reschedule`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      addTags(runId, body, requestOptions) {
        return zodfetch(zod.z.object({
          message: zod.z.string()
        }), `${this.baseUrl}/api/v1/runs/${runId}/tags`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      createSchedule(options, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(options)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listSchedules(options, requestOptions) {
        const searchParams = new URLSearchParams();
        if (options?.page) {
          searchParams.append("page", options.page.toString());
        }
        if (options?.perPage) {
          searchParams.append("perPage", options.perPage.toString());
        }
        return zodfetchOffsetLimitPage(ScheduleObject, `${this.baseUrl}/api/v1/schedules`, {
          page: options?.page,
          limit: options?.perPage
        }, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      retrieveSchedule(scheduleId, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      updateSchedule(scheduleId, options, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
          method: "PUT",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(options)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      deactivateSchedule(scheduleId, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}/deactivate`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      activateSchedule(scheduleId, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}/activate`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      deleteSchedule(scheduleId, requestOptions) {
        return zodfetch(DeletedScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
          method: "DELETE",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listEnvVars(projectRef, slug, requestOptions) {
        return zodfetch(EnvironmentVariables, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      importEnvVars(projectRef, slug, body, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/import`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      retrieveEnvVar(projectRef, slug, key, requestOptions) {
        return zodfetch(EnvironmentVariableValue, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      createEnvVar(projectRef, slug, body, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      updateEnvVar(projectRef, slug, key, body, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
          method: "PUT",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      deleteEnvVar(projectRef, slug, key, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
          method: "DELETE",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
    };
    _getHeaders = /* @__PURE__ */ new WeakSet();
    getHeaders_fn = /* @__PURE__ */ __name(function(spanParentAsLink) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
        "trigger-version": version2
      };
      if (taskContext.isInsideTask) {
        headers["x-trigger-worker"] = "true";
        api.propagation.inject(api.context.active(), headers);
        if (spanParentAsLink) {
          headers["x-trigger-span-parent-as-link"] = "1";
        }
      }
      return headers;
    }, "#getHeaders");
    __name(_ApiClient, "ApiClient");
    var ApiClient = _ApiClient;
    function createSearchQueryForListRuns(query) {
      const searchParams = new URLSearchParams();
      if (query) {
        if (query.status) {
          searchParams.append("filter[status]", Array.isArray(query.status) ? query.status.join(",") : query.status);
        }
        if (query.taskIdentifier) {
          searchParams.append("filter[taskIdentifier]", Array.isArray(query.taskIdentifier) ? query.taskIdentifier.join(",") : query.taskIdentifier);
        }
        if (query.version) {
          searchParams.append("filter[version]", Array.isArray(query.version) ? query.version.join(",") : query.version);
        }
        if (query.bulkAction) {
          searchParams.append("filter[bulkAction]", query.bulkAction);
        }
        if (query.tag) {
          searchParams.append("filter[tag]", Array.isArray(query.tag) ? query.tag.join(",") : query.tag);
        }
        if (query.schedule) {
          searchParams.append("filter[schedule]", query.schedule);
        }
        if (typeof query.isTest === "boolean") {
          searchParams.append("filter[isTest]", String(query.isTest));
        }
        if (query.from) {
          searchParams.append("filter[createdAt][from]", query.from instanceof Date ? query.from.getTime().toString() : query.from.toString());
        }
        if (query.to) {
          searchParams.append("filter[createdAt][to]", query.to instanceof Date ? query.to.getTime().toString() : query.to.toString());
        }
        if (query.period) {
          searchParams.append("filter[createdAt][period]", query.period);
        }
      }
      return searchParams;
    }
    __name(createSearchQueryForListRuns, "createSearchQueryForListRuns");
    function mergeRequestOptions(defaultOptions, options) {
      if (!options) {
        return defaultOptions;
      }
      return {
        ...defaultOptions,
        ...options,
        retry: {
          ...defaultOptions.retry,
          ...options.retry
        }
      };
    }
    __name(mergeRequestOptions, "mergeRequestOptions");
    var _SimpleClock = class _SimpleClock {
      preciseNow() {
        const now = new preciseDate.PreciseDate();
        const nowStruct = now.toStruct();
        return [
          nowStruct.seconds,
          nowStruct.nanos
        ];
      }
      reset() {
      }
    };
    __name(_SimpleClock, "SimpleClock");
    var SimpleClock = _SimpleClock;
    var API_NAME2 = "clock";
    var SIMPLE_CLOCK = new SimpleClock();
    var _getClock;
    var getClock_fn;
    var _ClockAPI = class _ClockAPI2 {
      constructor() {
        __privateAdd(this, _getClock);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _ClockAPI2();
        }
        return this._instance;
      }
      setGlobalClock(clock22) {
        return registerGlobal(API_NAME2, clock22);
      }
      preciseNow() {
        return __privateMethod(this, _getClock, getClock_fn).call(this).preciseNow();
      }
      reset() {
        __privateMethod(this, _getClock, getClock_fn).call(this).reset();
      }
    };
    _getClock = /* @__PURE__ */ new WeakSet();
    getClock_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME2) ?? SIMPLE_CLOCK;
    }, "#getClock");
    __name(_ClockAPI, "ClockAPI");
    var ClockAPI = _ClockAPI;
    var clock2 = ClockAPI.getInstance();
    var OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT = 256;
    var OTEL_LOG_ATTRIBUTE_COUNT_LIMIT = 256;
    var OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1028;
    var OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1028;
    var OTEL_SPAN_EVENT_COUNT_LIMIT = 10;
    var OTEL_LINK_COUNT_LIMIT = 2;
    var OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 10;
    var OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 10;
    var OFFLOAD_IO_PACKET_LENGTH_LIMIT = 128 * 1024;
    function imposeAttributeLimits(attributes) {
      const newAttributes = {};
      for (const [key, value] of Object.entries(attributes)) {
        if (calculateAttributeValueLength(value) > OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) {
          continue;
        }
        if (Object.keys(newAttributes).length >= OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) {
          break;
        }
        newAttributes[key] = value;
      }
      return newAttributes;
    }
    __name(imposeAttributeLimits, "imposeAttributeLimits");
    function calculateAttributeValueLength(value) {
      if (value === void 0 || value === null) {
        return 0;
      }
      if (typeof value === "string") {
        return value.length;
      }
      if (typeof value === "number") {
        return 8;
      }
      if (typeof value === "boolean") {
        return 4;
      }
      if (Array.isArray(value)) {
        return value.reduce((acc, v) => acc + calculateAttributeValueLength(v), 0);
      }
      return 0;
    }
    __name(calculateAttributeValueLength, "calculateAttributeValueLength");
    var _NoopTaskLogger = class _NoopTaskLogger {
      debug() {
      }
      log() {
      }
      info() {
      }
      warn() {
      }
      error() {
      }
      trace(name, fn) {
        return fn({});
      }
    };
    __name(_NoopTaskLogger, "NoopTaskLogger");
    var NoopTaskLogger = _NoopTaskLogger;
    var API_NAME3 = "logger";
    var NOOP_TASK_LOGGER = new NoopTaskLogger();
    var _getTaskLogger;
    var getTaskLogger_fn;
    var _LoggerAPI = class _LoggerAPI2 {
      constructor() {
        __privateAdd(this, _getTaskLogger);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _LoggerAPI2();
        }
        return this._instance;
      }
      disable() {
        unregisterGlobal(API_NAME3);
      }
      setGlobalTaskLogger(taskLogger) {
        return registerGlobal(API_NAME3, taskLogger);
      }
      debug(message, metadata) {
        __privateMethod(this, _getTaskLogger, getTaskLogger_fn).call(this).debug(message, metadata);
      }
      log(message, metadata) {
        __privateMethod(this, _getTaskLogger, getTaskLogger_fn).call(this).log(message, metadata);
      }
      info(message, metadata) {
        __privateMethod(this, _getTaskLogger, getTaskLogger_fn).call(this).info(message, metadata);
      }
      warn(message, metadata) {
        __privateMethod(this, _getTaskLogger, getTaskLogger_fn).call(this).warn(message, metadata);
      }
      error(message, metadata) {
        __privateMethod(this, _getTaskLogger, getTaskLogger_fn).call(this).error(message, metadata);
      }
      trace(name, fn) {
        return __privateMethod(this, _getTaskLogger, getTaskLogger_fn).call(this).trace(name, fn);
      }
    };
    _getTaskLogger = /* @__PURE__ */ new WeakSet();
    getTaskLogger_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME3) ?? NOOP_TASK_LOGGER;
    }, "#getTaskLogger");
    __name(_LoggerAPI, "LoggerAPI");
    var LoggerAPI = _LoggerAPI;
    var logger2 = LoggerAPI.getInstance();
    var _NoopRuntimeManager = class _NoopRuntimeManager {
      disable() {
      }
      waitForDuration(ms) {
        return Promise.resolve();
      }
      waitUntil(date) {
        return Promise.resolve();
      }
      waitForTask(params) {
        return Promise.resolve({
          ok: false,
          id: params.id,
          error: {
            type: "INTERNAL_ERROR",
            code: "CONFIGURED_INCORRECTLY"
          }
        });
      }
      waitForBatch(params) {
        return Promise.resolve({
          id: params.id,
          items: []
        });
      }
    };
    __name(_NoopRuntimeManager, "NoopRuntimeManager");
    var NoopRuntimeManager = _NoopRuntimeManager;
    var _NoopUsageManager = class _NoopUsageManager {
      disable() {
      }
      start() {
        return {
          sample: () => ({
            cpuTime: 0,
            wallTime: 0
          })
        };
      }
      stop(measurement) {
        return measurement.sample();
      }
      pauseAsync(cb) {
        return cb();
      }
      sample() {
        return void 0;
      }
    };
    __name(_NoopUsageManager, "NoopUsageManager");
    var NoopUsageManager = _NoopUsageManager;
    var API_NAME4 = "usage";
    var NOOP_USAGE_MANAGER = new NoopUsageManager();
    var _getUsageManager;
    var getUsageManager_fn;
    var _UsageAPI = class _UsageAPI2 {
      constructor() {
        __privateAdd(this, _getUsageManager);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _UsageAPI2();
        }
        return this._instance;
      }
      setGlobalUsageManager(manager) {
        return registerGlobal(API_NAME4, manager);
      }
      disable() {
        __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).disable();
        unregisterGlobal(API_NAME4);
      }
      start() {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).start();
      }
      stop(measurement) {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).stop(measurement);
      }
      pauseAsync(cb) {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).pauseAsync(cb);
      }
      sample() {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).sample();
      }
    };
    _getUsageManager = /* @__PURE__ */ new WeakSet();
    getUsageManager_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME4) ?? NOOP_USAGE_MANAGER;
    }, "#getUsageManager");
    __name(_UsageAPI, "UsageAPI");
    var UsageAPI = _UsageAPI;
    var usage2 = UsageAPI.getInstance();
    var API_NAME5 = "runtime";
    var NOOP_RUNTIME_MANAGER = new NoopRuntimeManager();
    var _getRuntimeManager;
    var getRuntimeManager_fn;
    var _RuntimeAPI = class _RuntimeAPI2 {
      constructor() {
        __privateAdd(this, _getRuntimeManager);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _RuntimeAPI2();
        }
        return this._instance;
      }
      waitForDuration(ms) {
        return usage2.pauseAsync(() => __privateMethod(this, _getRuntimeManager, getRuntimeManager_fn).call(this).waitForDuration(ms));
      }
      waitUntil(date) {
        return usage2.pauseAsync(() => __privateMethod(this, _getRuntimeManager, getRuntimeManager_fn).call(this).waitUntil(date));
      }
      waitForTask(params) {
        return usage2.pauseAsync(() => __privateMethod(this, _getRuntimeManager, getRuntimeManager_fn).call(this).waitForTask(params));
      }
      waitForBatch(params) {
        return usage2.pauseAsync(() => __privateMethod(this, _getRuntimeManager, getRuntimeManager_fn).call(this).waitForBatch(params));
      }
      setGlobalRuntimeManager(runtimeManager) {
        return registerGlobal(API_NAME5, runtimeManager);
      }
      disable() {
        __privateMethod(this, _getRuntimeManager, getRuntimeManager_fn).call(this).disable();
        unregisterGlobal(API_NAME5);
      }
    };
    _getRuntimeManager = /* @__PURE__ */ new WeakSet();
    getRuntimeManager_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME5) ?? NOOP_RUNTIME_MANAGER;
    }, "#getRuntimeManager");
    __name(_RuntimeAPI, "RuntimeAPI");
    var RuntimeAPI = _RuntimeAPI;
    var runtime2 = RuntimeAPI.getInstance();
    function getEnvVar2(name) {
      if (typeof process !== "undefined" && typeof process.env === "object" && process.env !== null) {
        return process.env[name];
      }
    }
    __name(getEnvVar2, "getEnvVar");
    var API_NAME6 = "api-client";
    var _getConfig;
    var getConfig_fn;
    var _APIClientManagerAPI = class _APIClientManagerAPI2 {
      constructor() {
        __privateAdd(this, _getConfig);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _APIClientManagerAPI2();
        }
        return this._instance;
      }
      disable() {
        unregisterGlobal(API_NAME6);
      }
      setGlobalAPIClientConfiguration(config2) {
        return registerGlobal(API_NAME6, config2);
      }
      get baseURL() {
        const store = __privateMethod(this, _getConfig, getConfig_fn).call(this);
        return store?.baseURL ?? getEnvVar2("TRIGGER_API_URL") ?? "https://api.trigger.dev";
      }
      get accessToken() {
        const store = __privateMethod(this, _getConfig, getConfig_fn).call(this);
        return store?.secretKey ?? getEnvVar2("TRIGGER_SECRET_KEY") ?? getEnvVar2("TRIGGER_ACCESS_TOKEN");
      }
      get client() {
        if (!this.baseURL || !this.accessToken) {
          return void 0;
        }
        return new ApiClient(this.baseURL, this.accessToken);
      }
    };
    _getConfig = /* @__PURE__ */ new WeakSet();
    getConfig_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME6);
    }, "#getConfig");
    __name(_APIClientManagerAPI, "APIClientManagerAPI");
    var APIClientManagerAPI = _APIClientManagerAPI;
    var apiClientManager = APIClientManagerAPI.getInstance();
    var _NoopTaskCatalog = class _NoopTaskCatalog {
      registerTaskMetadata(task) {
      }
      registerTaskFileMetadata(id, metadata) {
      }
      updateTaskMetadata(id, updates) {
      }
      getAllTaskMetadata() {
        return [];
      }
      getTaskMetadata(id) {
        return void 0;
      }
      getTask(id) {
        return void 0;
      }
      taskExists(id) {
        return false;
      }
      disable() {
      }
    };
    __name(_NoopTaskCatalog, "NoopTaskCatalog");
    var NoopTaskCatalog = _NoopTaskCatalog;
    var API_NAME7 = "task-catalog";
    var NOOP_TASK_CATALOG = new NoopTaskCatalog();
    var _getCatalog;
    var getCatalog_fn;
    var _TaskCatalogAPI = class _TaskCatalogAPI2 {
      constructor() {
        __privateAdd(this, _getCatalog);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TaskCatalogAPI2();
        }
        return this._instance;
      }
      setGlobalTaskCatalog(taskCatalog22) {
        return registerGlobal(API_NAME7, taskCatalog22);
      }
      disable() {
        unregisterGlobal(API_NAME7);
      }
      registerTaskMetadata(task) {
        __privateMethod(this, _getCatalog, getCatalog_fn).call(this).registerTaskMetadata(task);
      }
      updateTaskMetadata(id, updates) {
        __privateMethod(this, _getCatalog, getCatalog_fn).call(this).updateTaskMetadata(id, updates);
      }
      registerTaskFileMetadata(id, metadata) {
        __privateMethod(this, _getCatalog, getCatalog_fn).call(this).registerTaskFileMetadata(id, metadata);
      }
      getAllTaskMetadata() {
        return __privateMethod(this, _getCatalog, getCatalog_fn).call(this).getAllTaskMetadata();
      }
      getTaskMetadata(id) {
        return __privateMethod(this, _getCatalog, getCatalog_fn).call(this).getTaskMetadata(id);
      }
      getTask(id) {
        return __privateMethod(this, _getCatalog, getCatalog_fn).call(this).getTask(id);
      }
      taskExists(id) {
        return __privateMethod(this, _getCatalog, getCatalog_fn).call(this).taskExists(id);
      }
    };
    _getCatalog = /* @__PURE__ */ new WeakSet();
    getCatalog_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME7) ?? NOOP_TASK_CATALOG;
    }, "#getCatalog");
    __name(_TaskCatalogAPI, "TaskCatalogAPI");
    var TaskCatalogAPI = _TaskCatalogAPI;
    var taskCatalog3 = TaskCatalogAPI.getInstance();
    function dateDifference(date1, date2) {
      return Math.abs(date1.getTime() - date2.getTime());
    }
    __name(dateDifference, "dateDifference");
    function formatDuration(start, end, options) {
      if (!start || !end) {
        return "\u2013";
      }
      return formatDurationMilliseconds(dateDifference(start, end), options);
    }
    __name(formatDuration, "formatDuration");
    function nanosecondsToMilliseconds(nanoseconds) {
      return nanoseconds / 1e6;
    }
    __name(nanosecondsToMilliseconds, "nanosecondsToMilliseconds");
    function millisecondsToNanoseconds(milliseconds) {
      return milliseconds * 1e6;
    }
    __name(millisecondsToNanoseconds, "millisecondsToNanoseconds");
    function formatDurationNanoseconds(nanoseconds, options) {
      return formatDurationMilliseconds(nanosecondsToMilliseconds(nanoseconds), options);
    }
    __name(formatDurationNanoseconds, "formatDurationNanoseconds");
    var aboveOneSecondUnits = [
      "d",
      "h",
      "m",
      "s"
    ];
    var belowOneSecondUnits = [
      "ms"
    ];
    function formatDurationMilliseconds(milliseconds, options) {
      let duration = humanizeDuration__default.default(milliseconds, {
        units: options?.units ? options.units : milliseconds < 1e3 ? belowOneSecondUnits : aboveOneSecondUnits,
        maxDecimalPoints: options?.maxDecimalPoints ?? 1,
        largest: 2
      });
      if (!options) {
        return duration;
      }
      switch (options.style) {
        case "short":
          duration = duration.replace(" milliseconds", "ms");
          duration = duration.replace(" millisecond", "ms");
          duration = duration.replace(" seconds", "s");
          duration = duration.replace(" second", "s");
          duration = duration.replace(" minutes", "m");
          duration = duration.replace(" minute", "m");
          duration = duration.replace(" hours", "h");
          duration = duration.replace(" hour", "h");
          duration = duration.replace(" days", "d");
          duration = duration.replace(" day", "d");
          duration = duration.replace(" weeks", "w");
          duration = duration.replace(" week", "w");
          duration = duration.replace(" months", "mo");
          duration = duration.replace(" month", "mo");
          duration = duration.replace(" years", "y");
          duration = duration.replace(" year", "y");
      }
      return duration;
    }
    __name(formatDurationMilliseconds, "formatDurationMilliseconds");
    function formatDurationInDays(milliseconds) {
      let duration = humanizeDuration__default.default(milliseconds, {
        maxDecimalPoints: 0,
        largest: 2,
        units: [
          "d"
        ]
      });
      return duration;
    }
    __name(formatDurationInDays, "formatDurationInDays");
    var _TriggerTracer = class _TriggerTracer {
      constructor(_config) {
        this._config = _config;
      }
      get tracer() {
        if (!this._tracer) {
          if ("tracer" in this._config)
            return this._config.tracer;
          this._tracer = api.trace.getTracer(this._config.name, this._config.version);
        }
        return this._tracer;
      }
      get logger() {
        if (!this._logger) {
          if ("logger" in this._config)
            return this._config.logger;
          this._logger = apiLogs.logs.getLogger(this._config.name, this._config.version);
        }
        return this._logger;
      }
      extractContext(traceContext) {
        return api.propagation.extract(api.context.active(), traceContext ?? {});
      }
      startActiveSpan(name, fn, options, ctx) {
        const parentContext = ctx ?? api.context.active();
        const attributes = options?.attributes ?? {};
        return this.tracer.startActiveSpan(name, {
          ...options,
          attributes,
          startTime: clock2.preciseNow()
        }, parentContext, async (span) => {
          if (taskContext.ctx) {
            this.tracer.startSpan(name, {
              ...options,
              attributes: {
                ...attributes,
                [SemanticInternalAttributes.SPAN_PARTIAL]: true,
                [SemanticInternalAttributes.SPAN_ID]: span.spanContext().spanId
              }
            }, parentContext).end();
          }
          const usageMeasurement = usage2.start();
          try {
            return await fn(span);
          } catch (e) {
            if (typeof e === "string" || e instanceof Error) {
              span.recordException(e);
            }
            span.setStatus({
              code: api.SpanStatusCode.ERROR
            });
            throw e;
          } finally {
            if (taskContext.ctx) {
              const usageSample = usage2.stop(usageMeasurement);
              const machine = taskContext.ctx.machine;
              span.setAttributes({
                [SemanticInternalAttributes.USAGE_DURATION_MS]: usageSample.cpuTime,
                [SemanticInternalAttributes.USAGE_COST_IN_CENTS]: machine?.centsPerMs ? usageSample.cpuTime * machine.centsPerMs : 0
              });
            }
            span.end(clock2.preciseNow());
          }
        });
      }
      startSpan(name, options, ctx) {
        const parentContext = ctx ?? api.context.active();
        const attributes = options?.attributes ?? {};
        const span = this.tracer.startSpan(name, options, ctx);
        this.tracer.startSpan(name, {
          ...options,
          attributes: {
            ...attributes,
            [SemanticInternalAttributes.SPAN_PARTIAL]: true,
            [SemanticInternalAttributes.SPAN_ID]: span.spanContext().spanId
          }
        }, parentContext).end();
        return span;
      }
    };
    __name(_TriggerTracer, "TriggerTracer");
    var TriggerTracer2 = _TriggerTracer;
    function eventFilterMatches(payload, filter) {
      if (payload === void 0 || payload === null) {
        if (Object.entries(filter).length === 0) {
          return true;
        } else {
          return false;
        }
      }
      for (const [patternKey, patternValue] of Object.entries(filter)) {
        const payloadValue = payload[patternKey];
        if (Array.isArray(patternValue)) {
          if (patternValue.length === 0) {
            continue;
          }
          if (patternValue.every((item) => typeof item === "string")) {
            if (patternValue.includes(payloadValue)) {
              continue;
            }
            return false;
          }
          if (patternValue.every((item) => typeof item === "number")) {
            if (patternValue.includes(payloadValue)) {
              continue;
            }
            return false;
          }
          if (patternValue.every((item) => typeof item === "boolean")) {
            if (patternValue.includes(payloadValue)) {
              continue;
            }
            return false;
          }
          const objectArray = patternValue;
          if (!contentFiltersMatches(payloadValue, objectArray)) {
            return false;
          }
          continue;
        } else if (typeof patternValue === "object") {
          if (Array.isArray(payloadValue)) {
            if (!payloadValue.some((item) => eventFilterMatches(item, patternValue))) {
              return false;
            }
          } else {
            if (!eventFilterMatches(payloadValue, patternValue)) {
              return false;
            }
          }
        }
      }
      return true;
    }
    __name(eventFilterMatches, "eventFilterMatches");
    function contentFiltersMatches(actualValue, contentFilters) {
      for (const contentFilter of contentFilters) {
        if (typeof contentFilter === "object") {
          Object.entries(contentFilter)[0];
          if (!contentFilterMatches(actualValue, contentFilter)) {
            return false;
          }
        }
      }
      return true;
    }
    __name(contentFiltersMatches, "contentFiltersMatches");
    function contentFilterMatches(actualValue, contentFilter) {
      if ("$endsWith" in contentFilter) {
        if (typeof actualValue !== "string") {
          return false;
        }
        return actualValue.endsWith(contentFilter.$endsWith);
      }
      if ("$startsWith" in contentFilter) {
        if (typeof actualValue !== "string") {
          return false;
        }
        return actualValue.startsWith(contentFilter.$startsWith);
      }
      if ("$anythingBut" in contentFilter) {
        if (Array.isArray(contentFilter.$anythingBut)) {
          if (contentFilter.$anythingBut.includes(actualValue)) {
            return false;
          }
        }
        if (contentFilter.$anythingBut === actualValue) {
          return false;
        }
        return true;
      }
      if ("$exists" in contentFilter) {
        if (contentFilter.$exists) {
          return actualValue !== void 0;
        }
        return actualValue === void 0;
      }
      if ("$gt" in contentFilter) {
        if (typeof actualValue !== "number") {
          return false;
        }
        return actualValue > contentFilter.$gt;
      }
      if ("$lt" in contentFilter) {
        if (typeof actualValue !== "number") {
          return false;
        }
        return actualValue < contentFilter.$lt;
      }
      if ("$gte" in contentFilter) {
        if (typeof actualValue !== "number") {
          return false;
        }
        return actualValue >= contentFilter.$gte;
      }
      if ("$lte" in contentFilter) {
        if (typeof actualValue !== "number") {
          return false;
        }
        return actualValue <= contentFilter.$lte;
      }
      if ("$between" in contentFilter) {
        if (typeof actualValue !== "number") {
          return false;
        }
        return actualValue >= contentFilter.$between[0] && actualValue <= contentFilter.$between[1];
      }
      if ("$includes" in contentFilter) {
        if (Array.isArray(actualValue)) {
          return actualValue.includes(contentFilter.$includes);
        }
        return false;
      }
      if ("$ignoreCaseEquals" in contentFilter) {
        if (typeof actualValue !== "string") {
          return false;
        }
        return actualValue.localeCompare(contentFilter.$ignoreCaseEquals, void 0, {
          sensitivity: "accent"
        }) === 0;
      }
      if ("$isNull" in contentFilter) {
        if (contentFilter.$isNull) {
          return actualValue === null;
        }
        return actualValue !== null;
      }
      if ("$not" in contentFilter) {
        if (Array.isArray(actualValue)) {
          return !actualValue.includes(contentFilter.$not);
        } else if (typeof actualValue === "number" || typeof actualValue === "boolean" || typeof actualValue === "string") {
          return actualValue !== contentFilter.$not;
        }
        return false;
      }
      return true;
    }
    __name(contentFilterMatches, "contentFilterMatches");
    function omit(obj, ...keys) {
      const result = {};
      for (const key in obj) {
        if (!keys.includes(key)) {
          result[key] = obj[key];
        }
      }
      return result;
    }
    __name(omit, "omit");
    function detectDependencyVersion(dependency) {
      return dependencies[dependency];
    }
    __name(detectDependencyVersion, "detectDependencyVersion");
    async function parsePacket(value) {
      if (!value.data) {
        return void 0;
      }
      switch (value.dataType) {
        case "application/json":
          return JSON.parse(value.data);
        case "application/super+json":
          const { parse } = await loadSuperJSON();
          return parse(value.data);
        case "text/plain":
          return value.data;
        case "application/store":
          throw new Error(`Cannot parse an application/store packet (${value.data}). Needs to be imported first.`);
        default:
          return value.data;
      }
    }
    __name(parsePacket, "parsePacket");
    async function stringifyIO(value) {
      if (value === void 0) {
        return {
          dataType: "application/json"
        };
      }
      if (typeof value === "string") {
        return {
          data: value,
          dataType: "text/plain"
        };
      }
      try {
        const { stringify } = await loadSuperJSON();
        const data = stringify(value);
        return {
          data,
          dataType: "application/super+json"
        };
      } catch {
        return {
          data: value,
          dataType: "application/json"
        };
      }
    }
    __name(stringifyIO, "stringifyIO");
    async function conditionallyExportPacket(packet, pathPrefix, tracer2) {
      if (apiClientManager.client) {
        const { needsOffloading, size } = packetRequiresOffloading(packet);
        if (needsOffloading) {
          if (!tracer2) {
            return await exportPacket(packet, pathPrefix);
          } else {
            const result = await tracer2.startActiveSpan("store.uploadOutput", async (span) => {
              return await exportPacket(packet, pathPrefix);
            }, {
              attributes: {
                byteLength: size,
                [SemanticInternalAttributes.STYLE_ICON]: "cloud-upload"
              }
            });
            return result ?? packet;
          }
        }
      }
      return packet;
    }
    __name(conditionallyExportPacket, "conditionallyExportPacket");
    function packetRequiresOffloading(packet, lengthLimit) {
      if (!packet.data) {
        return {
          needsOffloading: false,
          size: 0
        };
      }
      const byteSize = Buffer.byteLength(packet.data, "utf8");
      return {
        needsOffloading: byteSize >= (lengthLimit ?? OFFLOAD_IO_PACKET_LENGTH_LIMIT),
        size: byteSize
      };
    }
    __name(packetRequiresOffloading, "packetRequiresOffloading");
    async function exportPacket(packet, pathPrefix) {
      const filename = `${pathPrefix}.${getPacketExtension(packet.dataType)}`;
      const presignedResponse = await apiClientManager.client.createUploadPayloadUrl(filename);
      const uploadResponse = await fetch(presignedResponse.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": packet.dataType
        },
        body: packet.data
      });
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload output to ${presignedResponse.presignedUrl}: ${uploadResponse.statusText}`);
      }
      return {
        data: filename,
        dataType: "application/store"
      };
    }
    __name(exportPacket, "exportPacket");
    async function conditionallyImportPacket(packet, tracer2) {
      if (packet.dataType !== "application/store") {
        return packet;
      }
      if (!tracer2) {
        return await importPacket(packet);
      } else {
        const result = await tracer2.startActiveSpan("store.downloadPayload", async (span) => {
          return await importPacket(packet, span);
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "cloud-download"
          }
        });
        return result ?? packet;
      }
    }
    __name(conditionallyImportPacket, "conditionallyImportPacket");
    async function importPacket(packet, span) {
      if (!packet.data) {
        return packet;
      }
      if (!apiClientManager.client) {
        return packet;
      }
      const presignedResponse = await apiClientManager.client.getPayloadUrl(packet.data);
      const response = await fetch(presignedResponse.presignedUrl);
      if (!response.ok) {
        throw new Error(`Failed to import packet ${presignedResponse.presignedUrl}: ${response.statusText}`);
      }
      const data = await response.text();
      span?.setAttribute("size", Buffer.byteLength(data, "utf8"));
      return {
        data,
        dataType: response.headers.get("content-type") ?? "application/json"
      };
    }
    __name(importPacket, "importPacket");
    async function createPacketAttributes(packet, dataKey, dataTypeKey) {
      if (!packet.data) {
        return;
      }
      switch (packet.dataType) {
        case "application/json":
          return {
            ...flattenAttributes(packet, dataKey),
            [dataTypeKey]: packet.dataType
          };
        case "application/super+json":
          const { parse } = await loadSuperJSON();
          if (typeof packet.data === "undefined" || packet.data === null) {
            return;
          }
          try {
            const parsed = parse(packet.data);
            const jsonified = JSON.parse(JSON.stringify(parsed, safeReplacer));
            const result = {
              ...flattenAttributes(jsonified, dataKey),
              [dataTypeKey]: "application/json"
            };
            return result;
          } catch (e) {
            return;
          }
        case "application/store":
          return {
            [dataKey]: packet.data,
            [dataTypeKey]: packet.dataType
          };
        case "text/plain":
          return {
            [dataKey]: packet.data,
            [dataTypeKey]: packet.dataType
          };
        default:
          return;
      }
    }
    __name(createPacketAttributes, "createPacketAttributes");
    async function createPacketAttributesAsJson(data, dataType) {
      if (typeof data === "string" || typeof data === "number" || typeof data === "boolean" || data === null || data === void 0) {
        return data;
      }
      switch (dataType) {
        case "application/json":
          return imposeAttributeLimits(flattenAttributes(data, void 0));
        case "application/super+json":
          const { deserialize } = await loadSuperJSON();
          const deserialized = deserialize(data);
          const jsonify = safeJsonParse2(JSON.stringify(deserialized, safeReplacer));
          return imposeAttributeLimits(flattenAttributes(jsonify, void 0));
        case "application/store":
          return data;
        default:
          return {};
      }
    }
    __name(createPacketAttributesAsJson, "createPacketAttributesAsJson");
    async function prettyPrintPacket(rawData, dataType) {
      if (rawData === void 0) {
        return "";
      }
      if (dataType === "application/super+json") {
        if (typeof rawData === "string") {
          rawData = safeJsonParse2(rawData);
        }
        const { deserialize } = await loadSuperJSON();
        return await prettyPrintPacket(deserialize(rawData), "application/json");
      }
      if (dataType === "application/json") {
        if (typeof rawData === "string") {
          rawData = safeJsonParse2(rawData);
        }
        return JSON.stringify(rawData, safeReplacer, 2);
      }
      if (typeof rawData === "string") {
        return rawData;
      }
      return JSON.stringify(rawData, safeReplacer, 2);
    }
    __name(prettyPrintPacket, "prettyPrintPacket");
    function safeReplacer(key, value) {
      if (typeof value === "bigint") {
        return value.toString();
      }
      if (value instanceof RegExp) {
        return value.toString();
      }
      if (value instanceof Set) {
        return Array.from(value);
      }
      if (value instanceof Map) {
        const obj = {};
        value.forEach((v, k) => {
          obj[k] = v;
        });
        return obj;
      }
      return value;
    }
    __name(safeReplacer, "safeReplacer");
    function getPacketExtension(outputType) {
      switch (outputType) {
        case "application/json":
          return "json";
        case "application/super+json":
          return "json";
        case "text/plain":
          return "txt";
        default:
          return "txt";
      }
    }
    __name(getPacketExtension, "getPacketExtension");
    async function loadSuperJSON() {
      return await import("superjson");
    }
    __name(loadSuperJSON, "loadSuperJSON");
    function safeJsonParse2(value) {
      try {
        return JSON.parse(value);
      } catch {
        return;
      }
    }
    __name(safeJsonParse2, "safeJsonParse");
    exports2.AbortTaskRunError = AbortTaskRunError;
    exports2.AddTagsRequestBody = AddTagsRequestBody;
    exports2.ApiClient = ApiClient;
    exports2.ApiConnectionError = ApiConnectionError;
    exports2.ApiError = ApiError;
    exports2.AttemptStatus = AttemptStatus;
    exports2.AuthenticationError = AuthenticationError;
    exports2.BackgroundWorkerClientMessages = BackgroundWorkerClientMessages;
    exports2.BackgroundWorkerMetadata = BackgroundWorkerMetadata;
    exports2.BackgroundWorkerProperties = BackgroundWorkerProperties;
    exports2.BackgroundWorkerServerMessages = BackgroundWorkerServerMessages;
    exports2.BadRequestError = BadRequestError;
    exports2.BatchTaskRunExecutionResult = BatchTaskRunExecutionResult;
    exports2.BatchTriggerTaskRequestBody = BatchTriggerTaskRequestBody;
    exports2.BatchTriggerTaskResponse = BatchTriggerTaskResponse;
    exports2.CanceledRunResponse = CanceledRunResponse;
    exports2.CancellationSpanEvent = CancellationSpanEvent;
    exports2.ClientToSharedQueueMessages = ClientToSharedQueueMessages;
    exports2.Config = Config;
    exports2.ConflictError = ConflictError;
    exports2.CoordinatorSocketData = CoordinatorSocketData;
    exports2.CoordinatorToPlatformMessages = CoordinatorToPlatformMessages;
    exports2.CoordinatorToProdWorkerMessages = CoordinatorToProdWorkerMessages;
    exports2.CreateAuthorizationCodeResponseSchema = CreateAuthorizationCodeResponseSchema;
    exports2.CreateBackgroundWorkerRequestBody = CreateBackgroundWorkerRequestBody;
    exports2.CreateBackgroundWorkerResponse = CreateBackgroundWorkerResponse;
    exports2.CreateEnvironmentVariableRequestBody = CreateEnvironmentVariableRequestBody;
    exports2.CreateScheduleOptions = CreateScheduleOptions;
    exports2.CreateUploadPayloadUrlResponseBody = CreateUploadPayloadUrlResponseBody;
    exports2.CursorPage = CursorPage;
    exports2.DeletedScheduleObject = DeletedScheduleObject;
    exports2.DeploymentErrorData = DeploymentErrorData;
    exports2.EnvironmentType = EnvironmentType;
    exports2.EnvironmentVariable = EnvironmentVariable;
    exports2.EnvironmentVariableResponseBody = EnvironmentVariableResponseBody;
    exports2.EnvironmentVariableValue = EnvironmentVariableValue;
    exports2.EnvironmentVariables = EnvironmentVariables;
    exports2.EventFilter = EventFilter;
    exports2.ExceptionEventProperties = ExceptionEventProperties;
    exports2.ExceptionSpanEvent = ExceptionSpanEvent;
    exports2.ExternalBuildData = ExternalBuildData;
    exports2.FetchRetryBackoffStrategy = FetchRetryBackoffStrategy;
    exports2.FetchRetryByStatusOptions = FetchRetryByStatusOptions;
    exports2.FetchRetryHeadersStrategy = FetchRetryHeadersStrategy;
    exports2.FetchRetryOptions = FetchRetryOptions;
    exports2.FetchRetryStrategy = FetchRetryStrategy;
    exports2.FetchTimeoutOptions = FetchTimeoutOptions;
    exports2.FixedWindowRateLimit = FixedWindowRateLimit;
    exports2.GetBatchResponseBody = GetBatchResponseBody;
    exports2.GetDeploymentResponseBody = GetDeploymentResponseBody;
    exports2.GetEnvironmentVariablesResponseBody = GetEnvironmentVariablesResponseBody;
    exports2.GetPersonalAccessTokenRequestSchema = GetPersonalAccessTokenRequestSchema;
    exports2.GetPersonalAccessTokenResponseSchema = GetPersonalAccessTokenResponseSchema;
    exports2.GetProjectEnvResponse = GetProjectEnvResponse;
    exports2.GetProjectResponseBody = GetProjectResponseBody;
    exports2.GetProjectsResponseBody = GetProjectsResponseBody;
    exports2.ImageDetailsMetadata = ImageDetailsMetadata;
    exports2.ImportEnvironmentVariablesRequestBody = ImportEnvironmentVariablesRequestBody;
    exports2.InitializeDeploymentRequestBody = InitializeDeploymentRequestBody;
    exports2.InitializeDeploymentResponseBody = InitializeDeploymentResponseBody;
    exports2.InternalServerError = InternalServerError;
    exports2.ListRunResponse = ListRunResponse;
    exports2.ListRunResponseItem = ListRunResponseItem;
    exports2.ListScheduleOptions = ListScheduleOptions;
    exports2.ListSchedulesResult = ListSchedulesResult;
    exports2.MachineConfig = MachineConfig;
    exports2.MachineCpu = MachineCpu;
    exports2.MachineMemory = MachineMemory;
    exports2.MachinePreset = MachinePreset;
    exports2.MachinePresetName = MachinePresetName;
    exports2.NULL_SENTINEL = NULL_SENTINEL;
    exports2.NotFoundError = NotFoundError;
    exports2.OFFLOAD_IO_PACKET_LENGTH_LIMIT = OFFLOAD_IO_PACKET_LENGTH_LIMIT;
    exports2.OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT;
    exports2.OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT = OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT;
    exports2.OTEL_LINK_COUNT_LIMIT = OTEL_LINK_COUNT_LIMIT;
    exports2.OTEL_LOG_ATTRIBUTE_COUNT_LIMIT = OTEL_LOG_ATTRIBUTE_COUNT_LIMIT;
    exports2.OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT = OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT;
    exports2.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT = OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT;
    exports2.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT = OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT;
    exports2.OTEL_SPAN_EVENT_COUNT_LIMIT = OTEL_SPAN_EVENT_COUNT_LIMIT;
    exports2.OffsetLimitPage = OffsetLimitPage;
    exports2.OtherSpanEvent = OtherSpanEvent;
    exports2.PRIMARY_VARIANT = PRIMARY_VARIANT;
    exports2.PermissionDeniedError = PermissionDeniedError;
    exports2.PlatformToCoordinatorMessages = PlatformToCoordinatorMessages;
    exports2.PlatformToProviderMessages = PlatformToProviderMessages;
    exports2.PostStartCauses = PostStartCauses;
    exports2.PreStopCauses = PreStopCauses;
    exports2.ProdChildToWorkerMessages = ProdChildToWorkerMessages;
    exports2.ProdTaskRunExecution = ProdTaskRunExecution;
    exports2.ProdTaskRunExecutionPayload = ProdTaskRunExecutionPayload;
    exports2.ProdWorkerSocketData = ProdWorkerSocketData;
    exports2.ProdWorkerToChildMessages = ProdWorkerToChildMessages;
    exports2.ProdWorkerToCoordinatorMessages = ProdWorkerToCoordinatorMessages;
    exports2.ProviderToPlatformMessages = ProviderToPlatformMessages;
    exports2.QueueOptions = QueueOptions;
    exports2.RateLimitError = RateLimitError;
    exports2.RateLimitOptions = RateLimitOptions;
    exports2.ReplayRunResponse = ReplayRunResponse;
    exports2.RescheduleRunRequestBody = RescheduleRunRequestBody;
    exports2.RetrieveRunResponse = RetrieveRunResponse;
    exports2.RetryOptions = RetryOptions;
    exports2.RunEnvironmentDetails = RunEnvironmentDetails;
    exports2.RunScheduleDetails = RunScheduleDetails;
    exports2.RunStatus = RunStatus;
    exports2.RunTags = RunTags;
    exports2.ScheduleGenerator = ScheduleGenerator;
    exports2.ScheduleMetadata = ScheduleMetadata;
    exports2.ScheduleObject = ScheduleObject;
    exports2.ScheduleType = ScheduleType;
    exports2.ScheduledTaskPayload = ScheduledTaskPayload;
    exports2.SemanticInternalAttributes = SemanticInternalAttributes;
    exports2.SerializedError = SerializedError;
    exports2.SharedQueueToClientMessages = SharedQueueToClientMessages;
    exports2.SlidingWindowRateLimit = SlidingWindowRateLimit;
    exports2.SpanEvent = SpanEvent;
    exports2.SpanEvents = SpanEvents;
    exports2.SpanMessagingEvent = SpanMessagingEvent;
    exports2.StartDeploymentIndexingRequestBody = StartDeploymentIndexingRequestBody;
    exports2.StartDeploymentIndexingResponseBody = StartDeploymentIndexingResponseBody;
    exports2.TaskEventStyle = TaskEventStyle;
    exports2.TaskFileMetadata = TaskFileMetadata;
    exports2.TaskMetadata = TaskMetadata;
    exports2.TaskMetadataFailedToParseData = TaskMetadataFailedToParseData;
    exports2.TaskMetadataWithFilePath = TaskMetadataWithFilePath;
    exports2.TaskResource = TaskResource;
    exports2.TaskRun = TaskRun;
    exports2.TaskRunBuiltInError = TaskRunBuiltInError;
    exports2.TaskRunContext = TaskRunContext;
    exports2.TaskRunCustomErrorObject = TaskRunCustomErrorObject;
    exports2.TaskRunError = TaskRunError;
    exports2.TaskRunErrorCodes = TaskRunErrorCodes2;
    exports2.TaskRunExecution = TaskRunExecution;
    exports2.TaskRunExecutionAttempt = TaskRunExecutionAttempt;
    exports2.TaskRunExecutionBatch = TaskRunExecutionBatch;
    exports2.TaskRunExecutionEnvironment = TaskRunExecutionEnvironment;
    exports2.TaskRunExecutionLazyAttemptPayload = TaskRunExecutionLazyAttemptPayload;
    exports2.TaskRunExecutionOrganization = TaskRunExecutionOrganization;
    exports2.TaskRunExecutionPayload = TaskRunExecutionPayload;
    exports2.TaskRunExecutionProject = TaskRunExecutionProject;
    exports2.TaskRunExecutionQueue = TaskRunExecutionQueue;
    exports2.TaskRunExecutionResult = TaskRunExecutionResult;
    exports2.TaskRunExecutionRetry = TaskRunExecutionRetry;
    exports2.TaskRunExecutionTask = TaskRunExecutionTask;
    exports2.TaskRunExecutionUsage = TaskRunExecutionUsage;
    exports2.TaskRunFailedExecutionResult = TaskRunFailedExecutionResult;
    exports2.TaskRunInternalError = TaskRunInternalError;
    exports2.TaskRunStringError = TaskRunStringError;
    exports2.TaskRunSuccessfulExecutionResult = TaskRunSuccessfulExecutionResult;
    exports2.TimezonesResult = TimezonesResult;
    exports2.TriggerTaskRequestBody = TriggerTaskRequestBody;
    exports2.TriggerTaskResponse = TriggerTaskResponse;
    exports2.TriggerTracer = TriggerTracer2;
    exports2.UncaughtExceptionMessage = UncaughtExceptionMessage;
    exports2.UnprocessableEntityError = UnprocessableEntityError;
    exports2.UpdateEnvironmentVariableRequestBody = UpdateEnvironmentVariableRequestBody;
    exports2.UpdateScheduleOptions = UpdateScheduleOptions;
    exports2.WaitReason = WaitReason;
    exports2.WhoAmIResponseSchema = WhoAmIResponseSchema;
    exports2.accessoryAttributes = accessoryAttributes;
    exports2.apiClientManager = apiClientManager;
    exports2.calculateNextRetryDelay = calculateNextRetryDelay;
    exports2.calculateResetAt = calculateResetAt2;
    exports2.childToWorkerMessages = childToWorkerMessages2;
    exports2.clientWebsocketMessages = clientWebsocketMessages;
    exports2.clock = clock2;
    exports2.conditionallyExportPacket = conditionallyExportPacket;
    exports2.conditionallyImportPacket = conditionallyImportPacket;
    exports2.correctErrorStackTrace = correctErrorStackTrace;
    exports2.createErrorTaskError = createErrorTaskError;
    exports2.createJsonErrorObject = createJsonErrorObject;
    exports2.createPacketAttributes = createPacketAttributes;
    exports2.createPacketAttributesAsJson = createPacketAttributesAsJson;
    exports2.defaultFetchRetryOptions = defaultFetchRetryOptions;
    exports2.defaultRetryOptions = defaultRetryOptions;
    exports2.detectDependencyVersion = detectDependencyVersion;
    exports2.eventFilterMatches = eventFilterMatches;
    exports2.flattenAttributes = flattenAttributes;
    exports2.formatDuration = formatDuration;
    exports2.formatDurationInDays = formatDurationInDays;
    exports2.formatDurationMilliseconds = formatDurationMilliseconds;
    exports2.formatDurationNanoseconds = formatDurationNanoseconds;
    exports2.groupTaskMetadataIssuesByTask = groupTaskMetadataIssuesByTask;
    exports2.imposeAttributeLimits = imposeAttributeLimits;
    exports2.isCancellationSpanEvent = isCancellationSpanEvent;
    exports2.isExceptionSpanEvent = isExceptionSpanEvent;
    exports2.isRequestOptions = isRequestOptions;
    exports2.logger = logger2;
    exports2.mergeRequestOptions = mergeRequestOptions;
    exports2.millisecondsToNanoseconds = millisecondsToNanoseconds;
    exports2.nanosecondsToMilliseconds = nanosecondsToMilliseconds;
    exports2.omit = omit;
    exports2.packetRequiresOffloading = packetRequiresOffloading;
    exports2.parseError = parseError;
    exports2.parsePacket = parsePacket;
    exports2.prettyPrintPacket = prettyPrintPacket;
    exports2.primitiveValueOrflattenedAttributes = primitiveValueOrflattenedAttributes;
    exports2.runtime = runtime2;
    exports2.sanitizeError = sanitizeError;
    exports2.serverWebsocketMessages = serverWebsocketMessages;
    exports2.stringPatternMatchers = stringPatternMatchers;
    exports2.stringifyIO = stringifyIO;
    exports2.taskCatalog = taskCatalog3;
    exports2.taskContext = taskContext;
    exports2.unflattenAttributes = unflattenAttributes;
    exports2.usage = usage2;
    exports2.workerToChildMessages = workerToChildMessages2;
  }
});

// ../../node_modules/@trigger.dev/core/dist/v3/workers/index.js
var require_workers = __commonJS({
  "../../node_modules/@trigger.dev/core/dist/v3/workers/index.js"(exports2) {
    "use strict";
    init_define_PROJECT_CONFIG();
    var api = require("@opentelemetry/api");
    var zod = require("zod");
    var apiLogs = require("@opentelemetry/api-logs");
    var exporterLogsOtlpHttp = require("@opentelemetry/exporter-logs-otlp-http");
    var exporterTraceOtlpHttp = require("@opentelemetry/exporter-trace-otlp-http");
    var instrumentation = require("@opentelemetry/instrumentation");
    var resources = require("@opentelemetry/resources");
    var sdkLogs = require("@opentelemetry/sdk-logs");
    var sdkTraceNode = require("@opentelemetry/sdk-trace-node");
    var semanticConventions = require("@opentelemetry/semantic-conventions");
    var zodValidationError = require("zod-validation-error");
    var preciseDate = require("@google-cloud/precise-date");
    var util = require("util");
    var promises = require("timers/promises");
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var util__default = /* @__PURE__ */ _interopDefault(util);
    var __defProp2 = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    var __accessCheck = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    var __privateGet = (obj, member, getter) => {
      __accessCheck(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    var __privateAdd = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    var __privateMethod = (obj, member, method) => {
      __accessCheck(obj, member, "access private method");
      return method;
    };
    function parseError(error) {
      if (error instanceof Error) {
        return {
          type: "BUILT_IN_ERROR",
          name: error.name,
          message: error.message,
          stackTrace: error.stack ?? ""
        };
      }
      if (typeof error === "string") {
        return {
          type: "STRING_ERROR",
          raw: error
        };
      }
      try {
        return {
          type: "CUSTOM_ERROR",
          raw: JSON.stringify(error)
        };
      } catch (e) {
        return {
          type: "CUSTOM_ERROR",
          raw: String(error)
        };
      }
    }
    __name(parseError, "parseError");
    var SerializedError = zod.z.object({
      message: zod.z.string(),
      name: zod.z.string().optional(),
      stackTrace: zod.z.string().optional()
    });
    function sanitizeError(error) {
      switch (error.type) {
        case "BUILT_IN_ERROR": {
          return {
            type: "BUILT_IN_ERROR",
            message: error.message?.replace(/\0/g, ""),
            name: error.name?.replace(/\0/g, ""),
            stackTrace: error.stackTrace?.replace(/\0/g, "")
          };
        }
        case "STRING_ERROR": {
          return {
            type: "STRING_ERROR",
            raw: error.raw.replace(/\0/g, "")
          };
        }
        case "CUSTOM_ERROR": {
          return {
            type: "CUSTOM_ERROR",
            raw: error.raw.replace(/\0/g, "")
          };
        }
        case "INTERNAL_ERROR": {
          return {
            type: "INTERNAL_ERROR",
            code: error.code,
            message: error.message?.replace(/\0/g, ""),
            stackTrace: error.stackTrace?.replace(/\0/g, "")
          };
        }
      }
    }
    __name(sanitizeError, "sanitizeError");
    var OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT = 256;
    var OTEL_LOG_ATTRIBUTE_COUNT_LIMIT = 256;
    var OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1028;
    var OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT = 1028;
    var OTEL_SPAN_EVENT_COUNT_LIMIT = 10;
    var OTEL_LINK_COUNT_LIMIT = 2;
    var OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 10;
    var OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 10;
    var OFFLOAD_IO_PACKET_LENGTH_LIMIT = 128 * 1024;
    var SemanticInternalAttributes = {
      ENVIRONMENT_ID: "ctx.environment.id",
      ENVIRONMENT_TYPE: "ctx.environment.type",
      ORGANIZATION_ID: "ctx.organization.id",
      ORGANIZATION_SLUG: "ctx.organization.slug",
      ORGANIZATION_NAME: "ctx.organization.name",
      PROJECT_ID: "ctx.project.id",
      PROJECT_REF: "ctx.project.ref",
      PROJECT_NAME: "ctx.project.title",
      PROJECT_DIR: "project.dir",
      ATTEMPT_ID: "ctx.attempt.id",
      ATTEMPT_NUMBER: "ctx.attempt.number",
      RUN_ID: "ctx.run.id",
      RUN_IS_TEST: "ctx.run.isTest",
      BATCH_ID: "ctx.batch.id",
      TASK_SLUG: "ctx.task.id",
      TASK_PATH: "ctx.task.filePath",
      TASK_EXPORT_NAME: "ctx.task.exportName",
      QUEUE_NAME: "ctx.queue.name",
      QUEUE_ID: "ctx.queue.id",
      MACHINE_PRESET_NAME: "ctx.machine.name",
      MACHINE_PRESET_CPU: "ctx.machine.cpu",
      MACHINE_PRESET_MEMORY: "ctx.machine.memory",
      MACHINE_PRESET_CENTS_PER_MS: "ctx.machine.centsPerMs",
      SPAN_PARTIAL: "$span.partial",
      SPAN_ID: "$span.span_id",
      OUTPUT: "$output",
      OUTPUT_TYPE: "$mime_type_output",
      STYLE: "$style",
      STYLE_ICON: "$style.icon",
      STYLE_VARIANT: "$style.variant",
      STYLE_ACCESSORY: "$style.accessory",
      METADATA: "$metadata",
      TRIGGER: "$trigger",
      PAYLOAD: "$payload",
      PAYLOAD_TYPE: "$mime_type_payload",
      SHOW: "$show",
      SHOW_ACTIONS: "$show.actions",
      WORKER_ID: "worker.id",
      WORKER_VERSION: "worker.version",
      CLI_VERSION: "cli.version",
      SDK_VERSION: "sdk.version",
      SDK_LANGUAGE: "sdk.language",
      RETRY_AT: "retry.at",
      RETRY_DELAY: "retry.delay",
      RETRY_COUNT: "retry.count",
      LINK_TITLE: "$link.title",
      IDEMPOTENCY_KEY: "ctx.run.idempotencyKey",
      USAGE_DURATION_MS: "$usage.durationMs",
      USAGE_COST_IN_CENTS: "$usage.costInCents",
      RATE_LIMIT_LIMIT: "response.rateLimit.limit",
      RATE_LIMIT_REMAINING: "response.rateLimit.remaining",
      RATE_LIMIT_RESET: "response.rateLimit.reset"
    };
    var NULL_SENTINEL = "$@null((";
    function flattenAttributes(obj, prefix) {
      const result = {};
      if (obj === void 0) {
        return result;
      }
      if (obj === null) {
        result[prefix || ""] = NULL_SENTINEL;
        return result;
      }
      if (typeof obj === "string") {
        result[prefix || ""] = obj;
        return result;
      }
      if (typeof obj === "number") {
        result[prefix || ""] = obj;
        return result;
      }
      if (typeof obj === "boolean") {
        result[prefix || ""] = obj;
        return result;
      }
      for (const [key, value] of Object.entries(obj)) {
        const newPrefix = `${prefix ? `${prefix}.` : ""}${Array.isArray(obj) ? `[${key}]` : key}`;
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === "object" && value[i] !== null) {
              Object.assign(result, flattenAttributes(value[i], `${newPrefix}.[${i}]`));
            } else {
              if (value[i] === null) {
                result[`${newPrefix}.[${i}]`] = NULL_SENTINEL;
              } else {
                result[`${newPrefix}.[${i}]`] = value[i];
              }
            }
          }
        } else if (isRecord(value)) {
          Object.assign(result, flattenAttributes(value, newPrefix));
        } else {
          if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
            result[newPrefix] = value;
          } else if (value === null) {
            result[newPrefix] = NULL_SENTINEL;
          }
        }
      }
      return result;
    }
    __name(flattenAttributes, "flattenAttributes");
    function isRecord(value) {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    }
    __name(isRecord, "isRecord");
    var _globalThis = typeof globalThis === "object" ? globalThis : global;
    var GLOBAL_TRIGGER_DOT_DEV_KEY = Symbol.for(`dev.trigger.ts.api`);
    var _global = _globalThis;
    function registerGlobal(type, instance, allowOverride = false) {
      const api2 = _global[GLOBAL_TRIGGER_DOT_DEV_KEY] = _global[GLOBAL_TRIGGER_DOT_DEV_KEY] ?? {};
      if (!allowOverride && api2[type]) {
        return false;
      }
      api2[type] = instance;
      return true;
    }
    __name(registerGlobal, "registerGlobal");
    function getGlobal(type) {
      return _global[GLOBAL_TRIGGER_DOT_DEV_KEY]?.[type];
    }
    __name(getGlobal, "getGlobal");
    function unregisterGlobal(type) {
      const api2 = _global[GLOBAL_TRIGGER_DOT_DEV_KEY];
      if (api2) {
        delete api2[type];
      }
    }
    __name(unregisterGlobal, "unregisterGlobal");
    var API_NAME = "task-context";
    var _getTaskContext;
    var getTaskContext_fn;
    var _TaskContextAPI = class _TaskContextAPI2 {
      constructor() {
        __privateAdd(this, _getTaskContext);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TaskContextAPI2();
        }
        return this._instance;
      }
      get isInsideTask() {
        return __privateMethod(this, _getTaskContext, getTaskContext_fn).call(this) !== void 0;
      }
      get ctx() {
        return __privateMethod(this, _getTaskContext, getTaskContext_fn).call(this)?.ctx;
      }
      get worker() {
        return __privateMethod(this, _getTaskContext, getTaskContext_fn).call(this)?.worker;
      }
      get attributes() {
        if (this.ctx) {
          return {
            ...this.contextAttributes,
            ...this.workerAttributes
          };
        }
        return {};
      }
      get workerAttributes() {
        if (this.worker) {
          return {
            [SemanticInternalAttributes.WORKER_ID]: this.worker.id,
            [SemanticInternalAttributes.WORKER_VERSION]: this.worker.version
          };
        }
        return {};
      }
      get contextAttributes() {
        if (this.ctx) {
          return {
            [SemanticInternalAttributes.ATTEMPT_ID]: this.ctx.attempt.id,
            [SemanticInternalAttributes.ATTEMPT_NUMBER]: this.ctx.attempt.number,
            [SemanticInternalAttributes.TASK_SLUG]: this.ctx.task.id,
            [SemanticInternalAttributes.TASK_PATH]: this.ctx.task.filePath,
            [SemanticInternalAttributes.TASK_EXPORT_NAME]: this.ctx.task.exportName,
            [SemanticInternalAttributes.QUEUE_NAME]: this.ctx.queue.name,
            [SemanticInternalAttributes.QUEUE_ID]: this.ctx.queue.id,
            [SemanticInternalAttributes.ENVIRONMENT_ID]: this.ctx.environment.id,
            [SemanticInternalAttributes.ENVIRONMENT_TYPE]: this.ctx.environment.type,
            [SemanticInternalAttributes.ORGANIZATION_ID]: this.ctx.organization.id,
            [SemanticInternalAttributes.PROJECT_ID]: this.ctx.project.id,
            [SemanticInternalAttributes.PROJECT_REF]: this.ctx.project.ref,
            [SemanticInternalAttributes.PROJECT_NAME]: this.ctx.project.name,
            [SemanticInternalAttributes.RUN_ID]: this.ctx.run.id,
            [SemanticInternalAttributes.RUN_IS_TEST]: this.ctx.run.isTest,
            [SemanticInternalAttributes.ORGANIZATION_SLUG]: this.ctx.organization.slug,
            [SemanticInternalAttributes.ORGANIZATION_NAME]: this.ctx.organization.name,
            [SemanticInternalAttributes.BATCH_ID]: this.ctx.batch?.id,
            [SemanticInternalAttributes.IDEMPOTENCY_KEY]: this.ctx.run.idempotencyKey,
            [SemanticInternalAttributes.MACHINE_PRESET_NAME]: this.ctx.machine?.name,
            [SemanticInternalAttributes.MACHINE_PRESET_CPU]: this.ctx.machine?.cpu,
            [SemanticInternalAttributes.MACHINE_PRESET_MEMORY]: this.ctx.machine?.memory,
            [SemanticInternalAttributes.MACHINE_PRESET_CENTS_PER_MS]: this.ctx.machine?.centsPerMs
          };
        }
        return {};
      }
      disable() {
        unregisterGlobal(API_NAME);
      }
      setGlobalTaskContext(taskContext2) {
        return registerGlobal(API_NAME, taskContext2);
      }
    };
    _getTaskContext = /* @__PURE__ */ new WeakSet();
    getTaskContext_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME);
    }, "#getTaskContext");
    __name(_TaskContextAPI, "TaskContextAPI");
    var TaskContextAPI = _TaskContextAPI;
    var taskContext = TaskContextAPI.getInstance();
    var _TaskContextSpanProcessor = class _TaskContextSpanProcessor {
      constructor(innerProcessor) {
        this._innerProcessor = innerProcessor;
      }
      // Called when a span starts
      onStart(span, parentContext) {
        if (taskContext.ctx) {
          span.setAttributes(flattenAttributes({
            [SemanticInternalAttributes.ATTEMPT_ID]: taskContext.ctx.attempt.id,
            [SemanticInternalAttributes.ATTEMPT_NUMBER]: taskContext.ctx.attempt.number
          }, SemanticInternalAttributes.METADATA));
        }
        this._innerProcessor.onStart(span, parentContext);
      }
      // Delegate the rest of the methods to the wrapped processor
      onEnd(span) {
        this._innerProcessor.onEnd(span);
      }
      shutdown() {
        return this._innerProcessor.shutdown();
      }
      forceFlush() {
        return this._innerProcessor.forceFlush();
      }
    };
    __name(_TaskContextSpanProcessor, "TaskContextSpanProcessor");
    var TaskContextSpanProcessor = _TaskContextSpanProcessor;
    var _TaskContextLogProcessor = class _TaskContextLogProcessor {
      constructor(innerProcessor) {
        this._innerProcessor = innerProcessor;
      }
      forceFlush() {
        return this._innerProcessor.forceFlush();
      }
      onEmit(logRecord, context2) {
        if (taskContext.ctx) {
          logRecord.setAttributes(flattenAttributes({
            [SemanticInternalAttributes.ATTEMPT_ID]: taskContext.ctx.attempt.id,
            [SemanticInternalAttributes.ATTEMPT_NUMBER]: taskContext.ctx.attempt.number
          }, SemanticInternalAttributes.METADATA));
        }
        this._innerProcessor.onEmit(logRecord, context2);
      }
      shutdown() {
        return this._innerProcessor.shutdown();
      }
    };
    __name(_TaskContextLogProcessor, "TaskContextLogProcessor");
    var TaskContextLogProcessor = _TaskContextLogProcessor;
    function getEnvVar2(name) {
      if (typeof process !== "undefined" && typeof process.env === "object" && process.env !== null) {
        return process.env[name];
      }
    }
    __name(getEnvVar2, "getEnvVar");
    var version2 = "3.0.0-beta.55";
    var _a;
    var AsyncResourceDetector = (_a = class {
      constructor() {
        __publicField(this, "_resolved", false);
        this._promise = new Promise((resolver) => {
          this._resolver = resolver;
        });
      }
      detect(_config) {
        return new resources.Resource({}, this._promise);
      }
      resolveWithAttributes(attributes) {
        if (!this._resolver) {
          throw new Error("Resolver not available");
        }
        if (this._resolved) {
          return;
        }
        this._resolved = true;
        this._resolver(attributes);
      }
    }, __name(_a, "AsyncResourceDetector"), _a);
    var _TracingSDK = class _TracingSDK {
      constructor(config2) {
        this.config = config2;
        this.asyncResourceDetector = new AsyncResourceDetector();
        setLogLevel(config2.diagLogLevel ?? "none");
        const envResourceAttributesSerialized = getEnvVar2("OTEL_RESOURCE_ATTRIBUTES");
        const envResourceAttributes = envResourceAttributesSerialized ? JSON.parse(envResourceAttributesSerialized) : {};
        const commonResources = resources.detectResourcesSync({
          detectors: [
            this.asyncResourceDetector,
            resources.processDetectorSync
          ]
        }).merge(new resources.Resource({
          [semanticConventions.SemanticResourceAttributes.CLOUD_PROVIDER]: "trigger.dev",
          [SemanticInternalAttributes.TRIGGER]: true,
          [SemanticInternalAttributes.CLI_VERSION]: version2
        })).merge(config2.resource ?? new resources.Resource({})).merge(new resources.Resource(envResourceAttributes));
        const traceProvider = new sdkTraceNode.NodeTracerProvider({
          forceFlushTimeoutMillis: config2.forceFlushTimeoutMillis,
          resource: commonResources,
          spanLimits: {
            attributeCountLimit: OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
            attributeValueLengthLimit: OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            eventCountLimit: OTEL_SPAN_EVENT_COUNT_LIMIT,
            attributePerEventCountLimit: OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
            linkCountLimit: OTEL_LINK_COUNT_LIMIT,
            attributePerLinkCountLimit: OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT
          }
        });
        const spanExporter = new exporterTraceOtlpHttp.OTLPTraceExporter({
          url: `${config2.url}/v1/traces`,
          timeoutMillis: config2.forceFlushTimeoutMillis
        });
        traceProvider.addSpanProcessor(new TaskContextSpanProcessor(getEnvVar2("OTEL_BATCH_PROCESSING_ENABLED") === "1" ? new sdkTraceNode.BatchSpanProcessor(spanExporter, {
          maxExportBatchSize: parseInt(getEnvVar2("OTEL_SPAN_MAX_EXPORT_BATCH_SIZE") ?? "64"),
          scheduledDelayMillis: parseInt(getEnvVar2("OTEL_SPAN_SCHEDULED_DELAY_MILLIS") ?? "200"),
          exportTimeoutMillis: parseInt(getEnvVar2("OTEL_SPAN_EXPORT_TIMEOUT_MILLIS") ?? "30000"),
          maxQueueSize: parseInt(getEnvVar2("OTEL_SPAN_MAX_QUEUE_SIZE") ?? "512")
        }) : new sdkTraceNode.SimpleSpanProcessor(spanExporter)));
        traceProvider.register();
        instrumentation.registerInstrumentations({
          instrumentations: config2.instrumentations ?? [],
          tracerProvider: traceProvider
        });
        const logExporter = new exporterLogsOtlpHttp.OTLPLogExporter({
          url: `${config2.url}/v1/logs`
        });
        const loggerProvider = new sdkLogs.LoggerProvider({
          resource: commonResources,
          logRecordLimits: {
            attributeCountLimit: OTEL_LOG_ATTRIBUTE_COUNT_LIMIT,
            attributeValueLengthLimit: OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT
          }
        });
        loggerProvider.addLogRecordProcessor(new TaskContextLogProcessor(getEnvVar2("OTEL_BATCH_PROCESSING_ENABLED") === "1" ? new sdkLogs.BatchLogRecordProcessor(logExporter, {
          maxExportBatchSize: parseInt(getEnvVar2("OTEL_LOG_MAX_EXPORT_BATCH_SIZE") ?? "64"),
          scheduledDelayMillis: parseInt(getEnvVar2("OTEL_LOG_SCHEDULED_DELAY_MILLIS") ?? "200"),
          exportTimeoutMillis: parseInt(getEnvVar2("OTEL_LOG_EXPORT_TIMEOUT_MILLIS") ?? "30000"),
          maxQueueSize: parseInt(getEnvVar2("OTEL_LOG_MAX_QUEUE_SIZE") ?? "512")
        }) : new sdkLogs.SimpleLogRecordProcessor(logExporter)));
        this._logProvider = loggerProvider;
        this._spanExporter = spanExporter;
        this._traceProvider = traceProvider;
        apiLogs.logs.setGlobalLoggerProvider(loggerProvider);
        this.getLogger = loggerProvider.getLogger.bind(loggerProvider);
        this.getTracer = traceProvider.getTracer.bind(traceProvider);
      }
      async flush() {
        await Promise.all([
          this._traceProvider.forceFlush(),
          this._logProvider.forceFlush()
        ]);
      }
      async shutdown() {
        await Promise.all([
          this._traceProvider.shutdown(),
          this._logProvider.shutdown()
        ]);
      }
    };
    __name(_TracingSDK, "TracingSDK");
    var TracingSDK2 = _TracingSDK;
    function setLogLevel(level) {
      let diagLogLevel;
      switch (level) {
        case "none":
          diagLogLevel = api.DiagLogLevel.NONE;
          break;
        case "error":
          diagLogLevel = api.DiagLogLevel.ERROR;
          break;
        case "warn":
          diagLogLevel = api.DiagLogLevel.WARN;
          break;
        case "info":
          diagLogLevel = api.DiagLogLevel.INFO;
          break;
        case "debug":
          diagLogLevel = api.DiagLogLevel.DEBUG;
          break;
        case "verbose":
          diagLogLevel = api.DiagLogLevel.VERBOSE;
          break;
        case "all":
          diagLogLevel = api.DiagLogLevel.ALL;
          break;
        default:
          diagLogLevel = api.DiagLogLevel.NONE;
      }
      api.diag.setLogger(new api.DiagConsoleLogger(), diagLogLevel);
    }
    __name(setLogLevel, "setLogLevel");
    function recordSpanException(span, error) {
      if (error instanceof Error) {
        span.recordException(sanitizeSpanError(error));
      } else if (typeof error === "string") {
        span.recordException(error.replace(/\0/g, ""));
      } else {
        span.recordException(JSON.stringify(error).replace(/\0/g, ""));
      }
      span.setStatus({
        code: api.SpanStatusCode.ERROR
      });
    }
    __name(recordSpanException, "recordSpanException");
    function sanitizeSpanError(error) {
      const sanitizedError = new Error(error.message.replace(/\0/g, ""));
      sanitizedError.name = error.name.replace(/\0/g, "");
      sanitizedError.stack = error.stack?.replace(/\0/g, "");
      return sanitizedError;
    }
    __name(sanitizeSpanError, "sanitizeSpanError");
    var MachineCpu = zod.z.union([
      zod.z.literal(0.25),
      zod.z.literal(0.5),
      zod.z.literal(1),
      zod.z.literal(2),
      zod.z.literal(4)
    ]);
    var MachineMemory = zod.z.union([
      zod.z.literal(0.25),
      zod.z.literal(0.5),
      zod.z.literal(1),
      zod.z.literal(2),
      zod.z.literal(4),
      zod.z.literal(8)
    ]);
    var MachinePresetName = zod.z.enum([
      "micro",
      "small-1x",
      "small-2x",
      "medium-1x",
      "medium-2x",
      "large-1x",
      "large-2x"
    ]);
    var MachineConfig = zod.z.object({
      cpu: MachineCpu.optional(),
      memory: MachineMemory.optional(),
      preset: MachinePresetName.optional()
    });
    var MachinePreset = zod.z.object({
      name: MachinePresetName,
      cpu: zod.z.number(),
      memory: zod.z.number(),
      centsPerMs: zod.z.number()
    });
    var TaskRunBuiltInError = zod.z.object({
      type: zod.z.literal("BUILT_IN_ERROR"),
      name: zod.z.string(),
      message: zod.z.string(),
      stackTrace: zod.z.string()
    });
    var TaskRunCustomErrorObject = zod.z.object({
      type: zod.z.literal("CUSTOM_ERROR"),
      raw: zod.z.string()
    });
    var TaskRunStringError = zod.z.object({
      type: zod.z.literal("STRING_ERROR"),
      raw: zod.z.string()
    });
    var TaskRunErrorCodes2 = {
      COULD_NOT_FIND_EXECUTOR: "COULD_NOT_FIND_EXECUTOR",
      COULD_NOT_FIND_TASK: "COULD_NOT_FIND_TASK",
      CONFIGURED_INCORRECTLY: "CONFIGURED_INCORRECTLY",
      TASK_ALREADY_RUNNING: "TASK_ALREADY_RUNNING",
      TASK_EXECUTION_FAILED: "TASK_EXECUTION_FAILED",
      TASK_EXECUTION_ABORTED: "TASK_EXECUTION_ABORTED",
      TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE: "TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE",
      TASK_PROCESS_SIGKILL_TIMEOUT: "TASK_PROCESS_SIGKILL_TIMEOUT",
      TASK_RUN_CANCELLED: "TASK_RUN_CANCELLED",
      TASK_OUTPUT_ERROR: "TASK_OUTPUT_ERROR",
      HANDLE_ERROR_ERROR: "HANDLE_ERROR_ERROR",
      GRACEFUL_EXIT_TIMEOUT: "GRACEFUL_EXIT_TIMEOUT",
      TASK_RUN_CRASHED: "TASK_RUN_CRASHED"
    };
    var TaskRunInternalError = zod.z.object({
      type: zod.z.literal("INTERNAL_ERROR"),
      code: zod.z.enum([
        "COULD_NOT_FIND_EXECUTOR",
        "COULD_NOT_FIND_TASK",
        "CONFIGURED_INCORRECTLY",
        "TASK_ALREADY_RUNNING",
        "TASK_EXECUTION_FAILED",
        "TASK_EXECUTION_ABORTED",
        "TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE",
        "TASK_PROCESS_SIGKILL_TIMEOUT",
        "TASK_RUN_CANCELLED",
        "TASK_OUTPUT_ERROR",
        "HANDLE_ERROR_ERROR",
        "GRACEFUL_EXIT_TIMEOUT",
        "TASK_RUN_HEARTBEAT_TIMEOUT",
        "TASK_RUN_CRASHED"
      ]),
      message: zod.z.string().optional(),
      stackTrace: zod.z.string().optional()
    });
    var TaskRunError = zod.z.discriminatedUnion("type", [
      TaskRunBuiltInError,
      TaskRunCustomErrorObject,
      TaskRunStringError,
      TaskRunInternalError
    ]);
    var TaskRun = zod.z.object({
      id: zod.z.string(),
      payload: zod.z.string(),
      payloadType: zod.z.string(),
      context: zod.z.any(),
      tags: zod.z.array(zod.z.string()),
      isTest: zod.z.boolean().default(false),
      createdAt: zod.z.coerce.date(),
      startedAt: zod.z.coerce.date().default(() => /* @__PURE__ */ new Date()),
      idempotencyKey: zod.z.string().optional(),
      maxAttempts: zod.z.number().optional(),
      durationMs: zod.z.number().default(0),
      costInCents: zod.z.number().default(0),
      baseCostInCents: zod.z.number().default(0),
      version: zod.z.string().optional()
    });
    var TaskRunExecutionTask = zod.z.object({
      id: zod.z.string(),
      filePath: zod.z.string(),
      exportName: zod.z.string()
    });
    var TaskRunExecutionAttempt = zod.z.object({
      id: zod.z.string(),
      number: zod.z.number(),
      startedAt: zod.z.coerce.date(),
      backgroundWorkerId: zod.z.string(),
      backgroundWorkerTaskId: zod.z.string(),
      status: zod.z.string()
    });
    var TaskRunExecutionEnvironment = zod.z.object({
      id: zod.z.string(),
      slug: zod.z.string(),
      type: zod.z.enum([
        "PRODUCTION",
        "STAGING",
        "DEVELOPMENT",
        "PREVIEW"
      ])
    });
    var TaskRunExecutionOrganization = zod.z.object({
      id: zod.z.string(),
      slug: zod.z.string(),
      name: zod.z.string()
    });
    var TaskRunExecutionProject = zod.z.object({
      id: zod.z.string(),
      ref: zod.z.string(),
      slug: zod.z.string(),
      name: zod.z.string()
    });
    var TaskRunExecutionQueue = zod.z.object({
      id: zod.z.string(),
      name: zod.z.string()
    });
    var TaskRunExecutionBatch = zod.z.object({
      id: zod.z.string()
    });
    var TaskRunExecution = zod.z.object({
      task: TaskRunExecutionTask,
      attempt: TaskRunExecutionAttempt,
      run: TaskRun,
      queue: TaskRunExecutionQueue,
      environment: TaskRunExecutionEnvironment,
      organization: TaskRunExecutionOrganization,
      project: TaskRunExecutionProject,
      batch: TaskRunExecutionBatch.optional(),
      machine: MachinePreset.optional()
    });
    var TaskRunContext = zod.z.object({
      task: TaskRunExecutionTask,
      attempt: TaskRunExecutionAttempt.omit({
        backgroundWorkerId: true,
        backgroundWorkerTaskId: true
      }),
      run: TaskRun.omit({
        payload: true,
        payloadType: true
      }),
      queue: TaskRunExecutionQueue,
      environment: TaskRunExecutionEnvironment,
      organization: TaskRunExecutionOrganization,
      project: TaskRunExecutionProject,
      batch: TaskRunExecutionBatch.optional(),
      machine: MachinePreset.optional()
    });
    var TaskRunExecutionRetry = zod.z.object({
      timestamp: zod.z.number(),
      delay: zod.z.number(),
      error: zod.z.unknown().optional()
    });
    var TaskRunExecutionUsage = zod.z.object({
      durationMs: zod.z.number()
    });
    var TaskRunFailedExecutionResult = zod.z.object({
      ok: zod.z.literal(false),
      id: zod.z.string(),
      error: TaskRunError,
      retry: TaskRunExecutionRetry.optional(),
      skippedRetrying: zod.z.boolean().optional(),
      usage: TaskRunExecutionUsage.optional()
    });
    var TaskRunSuccessfulExecutionResult = zod.z.object({
      ok: zod.z.literal(true),
      id: zod.z.string(),
      output: zod.z.string().optional(),
      outputType: zod.z.string(),
      usage: TaskRunExecutionUsage.optional()
    });
    var TaskRunExecutionResult = zod.z.discriminatedUnion("ok", [
      TaskRunSuccessfulExecutionResult,
      TaskRunFailedExecutionResult
    ]);
    var BatchTaskRunExecutionResult = zod.z.object({
      id: zod.z.string(),
      items: TaskRunExecutionResult.array()
    });
    zod.z.enum([
      "PRODUCTION",
      "STAGING",
      "DEVELOPMENT",
      "PREVIEW"
    ]);
    zod.z.object({
      execution: TaskRunExecution,
      traceContext: zod.z.record(zod.z.unknown()),
      environment: zod.z.record(zod.z.string()).optional()
    });
    var ProdTaskRunExecution = TaskRunExecution.extend({
      worker: zod.z.object({
        id: zod.z.string(),
        contentHash: zod.z.string(),
        version: zod.z.string()
      }),
      machine: MachinePreset.default({
        name: "small-1x",
        cpu: 1,
        memory: 1,
        centsPerMs: 0
      })
    });
    zod.z.object({
      execution: ProdTaskRunExecution,
      traceContext: zod.z.record(zod.z.unknown()),
      environment: zod.z.record(zod.z.string()).optional()
    });
    var FixedWindowRateLimit = zod.z.object({
      type: zod.z.literal("fixed-window"),
      limit: zod.z.number(),
      window: zod.z.union([
        zod.z.object({
          seconds: zod.z.number()
        }),
        zod.z.object({
          minutes: zod.z.number()
        }),
        zod.z.object({
          hours: zod.z.number()
        })
      ])
    });
    var SlidingWindowRateLimit = zod.z.object({
      type: zod.z.literal("sliding-window"),
      limit: zod.z.number(),
      window: zod.z.union([
        zod.z.object({
          seconds: zod.z.number()
        }),
        zod.z.object({
          minutes: zod.z.number()
        }),
        zod.z.object({
          hours: zod.z.number()
        })
      ])
    });
    var RateLimitOptions = zod.z.discriminatedUnion("type", [
      FixedWindowRateLimit,
      SlidingWindowRateLimit
    ]);
    var RetryOptions = zod.z.object({
      /** The number of attempts before giving up */
      maxAttempts: zod.z.number().int().optional(),
      /** The exponential factor to use when calculating the next retry time.
      *
      * Each subsequent retry will be calculated as `previousTimeout * factor`
      */
      factor: zod.z.number().optional(),
      /** The minimum time to wait before retrying */
      minTimeoutInMs: zod.z.number().int().optional(),
      /** The maximum time to wait before retrying */
      maxTimeoutInMs: zod.z.number().int().optional(),
      /** Randomize the timeout between retries.
      *
      * This can be useful to prevent the thundering herd problem where all retries happen at the same time.
      */
      randomize: zod.z.boolean().optional()
    });
    var QueueOptions = zod.z.object({
      /** You can define a shared queue and then pass the name in to your task.
         * 
         * @example
         * 
         * ```ts
         * const myQueue = queue({
            name: "my-queue",
            concurrencyLimit: 1,
          });
      
          export const task1 = task({
            id: "task-1",
            queue: {
              name: "my-queue",
            },
            run: async (payload: { message: string }) => {
              // ...
            },
          });
      
          export const task2 = task({
            id: "task-2",
            queue: {
              name: "my-queue",
            },
            run: async (payload: { message: string }) => {
              // ...
            },
          });
         * ```
         */
      name: zod.z.string().optional(),
      /** An optional property that specifies the maximum number of concurrent run executions.
      *
      * If this property is omitted, the task can potentially use up the full concurrency of an environment. */
      concurrencyLimit: zod.z.number().int().min(0).max(1e3).optional(),
      /** @deprecated This feature is coming soon */
      rateLimit: RateLimitOptions.optional()
    });
    var ScheduleMetadata = zod.z.object({
      cron: zod.z.string(),
      timezone: zod.z.string()
    });
    zod.z.object({
      id: zod.z.string(),
      packageVersion: zod.z.string(),
      queue: QueueOptions.optional(),
      retry: RetryOptions.optional(),
      machine: MachineConfig.optional(),
      triggerSource: zod.z.string().optional(),
      schedule: ScheduleMetadata.optional()
    });
    zod.z.object({
      filePath: zod.z.string(),
      exportName: zod.z.string()
    });
    zod.z.object({
      id: zod.z.string(),
      packageVersion: zod.z.string(),
      queue: QueueOptions.optional(),
      retry: RetryOptions.optional(),
      machine: MachineConfig.optional(),
      triggerSource: zod.z.string().optional(),
      schedule: ScheduleMetadata.optional(),
      filePath: zod.z.string(),
      exportName: zod.z.string()
    });
    zod.z.enum([
      "index",
      "create",
      "restore"
    ]);
    zod.z.enum([
      "terminate"
    ]);
    var RegexSchema = zod.z.custom((val) => {
      try {
        return typeof val.test === "function";
      } catch {
        return false;
      }
    });
    zod.z.object({
      project: zod.z.string(),
      triggerDirectories: zod.z.string().array().optional(),
      triggerUrl: zod.z.string().optional(),
      projectDir: zod.z.string().optional(),
      tsconfigPath: zod.z.string().optional(),
      retries: zod.z.object({
        enabledInDev: zod.z.boolean().default(true),
        default: RetryOptions.optional()
      }).optional(),
      additionalPackages: zod.z.string().array().optional(),
      additionalFiles: zod.z.string().array().optional(),
      dependenciesToBundle: zod.z.array(zod.z.union([
        zod.z.string(),
        RegexSchema
      ])).optional(),
      logLevel: zod.z.string().optional(),
      enableConsoleLogging: zod.z.boolean().optional(),
      postInstall: zod.z.string().optional(),
      extraCACerts: zod.z.string().optional()
    });
    zod.z.enum([
      "WAIT_FOR_DURATION",
      "WAIT_FOR_TASK",
      "WAIT_FOR_BATCH"
    ]);
    zod.z.object({
      runId: zod.z.string(),
      attemptCount: zod.z.number().optional(),
      messageId: zod.z.string(),
      isTest: zod.z.boolean(),
      traceContext: zod.z.record(zod.z.unknown()),
      environment: zod.z.record(zod.z.string()).optional()
    });
    var TaskResource = zod.z.object({
      id: zod.z.string(),
      filePath: zod.z.string(),
      exportName: zod.z.string(),
      queue: QueueOptions.optional(),
      retry: RetryOptions.optional(),
      machine: MachineConfig.optional(),
      triggerSource: zod.z.string().optional(),
      schedule: ScheduleMetadata.optional()
    });
    var BackgroundWorkerMetadata = zod.z.object({
      packageVersion: zod.z.string(),
      contentHash: zod.z.string(),
      cliPackageVersion: zod.z.string().optional(),
      tasks: zod.z.array(TaskResource)
    });
    zod.z.object({
      contentHash: zod.z.string(),
      imageTag: zod.z.string()
    });
    zod.z.object({
      userId: zod.z.string(),
      email: zod.z.string().email(),
      dashboardUrl: zod.z.string()
    });
    var GetProjectResponseBody = zod.z.object({
      id: zod.z.string(),
      externalRef: zod.z.string(),
      name: zod.z.string(),
      slug: zod.z.string(),
      createdAt: zod.z.coerce.date(),
      organization: zod.z.object({
        id: zod.z.string(),
        title: zod.z.string(),
        slug: zod.z.string(),
        createdAt: zod.z.coerce.date()
      })
    });
    zod.z.array(GetProjectResponseBody);
    zod.z.object({
      apiKey: zod.z.string(),
      name: zod.z.string(),
      apiUrl: zod.z.string()
    });
    zod.z.object({
      localOnly: zod.z.boolean(),
      metadata: BackgroundWorkerMetadata,
      supportsLazyAttempts: zod.z.boolean().optional()
    });
    zod.z.object({
      id: zod.z.string(),
      version: zod.z.string(),
      contentHash: zod.z.string()
    });
    var RunTag = zod.z.string().max(64, "Tags must be less than 64 characters");
    var RunTags = zod.z.union([
      RunTag,
      RunTag.array()
    ]);
    var TriggerTaskRequestBody = zod.z.object({
      payload: zod.z.any(),
      context: zod.z.any(),
      options: zod.z.object({
        dependentAttempt: zod.z.string().optional(),
        dependentBatch: zod.z.string().optional(),
        lockToVersion: zod.z.string().optional(),
        queue: QueueOptions.optional(),
        concurrencyKey: zod.z.string().optional(),
        idempotencyKey: zod.z.string().optional(),
        test: zod.z.boolean().optional(),
        payloadType: zod.z.string().optional(),
        delay: zod.z.string().or(zod.z.coerce.date()).optional(),
        ttl: zod.z.string().or(zod.z.number().nonnegative().int()).optional(),
        tags: RunTags.optional(),
        maxAttempts: zod.z.number().int().optional()
      }).optional()
    });
    var TriggerTaskResponse = zod.z.object({
      id: zod.z.string()
    });
    zod.z.object({
      items: TriggerTaskRequestBody.array(),
      dependentAttempt: zod.z.string().optional()
    });
    var BatchTriggerTaskResponse = zod.z.object({
      batchId: zod.z.string(),
      runs: zod.z.string().array()
    });
    zod.z.object({
      id: zod.z.string(),
      items: zod.z.array(zod.z.object({
        id: zod.z.string(),
        taskRunId: zod.z.string(),
        status: zod.z.enum([
          "PENDING",
          "CANCELED",
          "COMPLETED",
          "FAILED"
        ])
      }))
    });
    zod.z.object({
      tags: RunTags
    });
    zod.z.object({
      delay: zod.z.string().or(zod.z.coerce.date())
    });
    zod.z.object({
      variables: zod.z.record(zod.z.string())
    });
    zod.z.object({
      imageReference: zod.z.string(),
      selfHosted: zod.z.boolean().optional()
    });
    zod.z.object({
      id: zod.z.string(),
      contentHash: zod.z.string()
    });
    var ExternalBuildData = zod.z.object({
      buildId: zod.z.string(),
      buildToken: zod.z.string(),
      projectId: zod.z.string()
    });
    zod.z.object({
      id: zod.z.string(),
      contentHash: zod.z.string(),
      shortCode: zod.z.string(),
      version: zod.z.string(),
      imageTag: zod.z.string(),
      externalBuildData: ExternalBuildData.optional().nullable(),
      registryHost: zod.z.string().optional()
    });
    zod.z.object({
      contentHash: zod.z.string(),
      userId: zod.z.string().optional()
    });
    var DeploymentErrorData = zod.z.object({
      name: zod.z.string(),
      message: zod.z.string(),
      stack: zod.z.string().optional(),
      stderr: zod.z.string().optional()
    });
    zod.z.object({
      id: zod.z.string(),
      status: zod.z.enum([
        "PENDING",
        "BUILDING",
        "DEPLOYING",
        "DEPLOYED",
        "FAILED",
        "CANCELED",
        "TIMED_OUT"
      ]),
      contentHash: zod.z.string(),
      shortCode: zod.z.string(),
      version: zod.z.string(),
      imageReference: zod.z.string().optional(),
      errorData: DeploymentErrorData.optional().nullable(),
      worker: zod.z.object({
        id: zod.z.string(),
        version: zod.z.string(),
        tasks: zod.z.array(zod.z.object({
          id: zod.z.string(),
          slug: zod.z.string(),
          filePath: zod.z.string(),
          exportName: zod.z.string()
        }))
      }).optional()
    });
    var CreateUploadPayloadUrlResponseBody = zod.z.object({
      presignedUrl: zod.z.string()
    });
    var ReplayRunResponse = zod.z.object({
      id: zod.z.string()
    });
    var CanceledRunResponse = zod.z.object({
      id: zod.z.string()
    });
    var ScheduleType = zod.z.union([
      zod.z.literal("DECLARATIVE"),
      zod.z.literal("IMPERATIVE")
    ]);
    zod.z.object({
      /** The schedule id associated with this run (you can have many schedules for the same task).
      You can use this to remove the schedule, update it, etc */
      scheduleId: zod.z.string(),
      /** The type of schedule – `"DECLARATIVE"` or `"IMPERATIVE"`.
      *
      * **DECLARATIVE** – defined inline on your `schedules.task` using the `cron` property. They can only be created, updated or deleted by modifying the `cron` property on your task.
      *
      * **IMPERATIVE** – created using the `schedules.create` functions or in the dashboard.
      */
      type: ScheduleType,
      /** When the task was scheduled to run.
      * Note this will be slightly different from `new Date()` because it takes a few ms to run the task.
      * 
      * This date is UTC. To output it as a string with a timezone you would do this: 
      * ```ts
      * const formatted = payload.timestamp.toLocaleString("en-US", {
           timeZone: payload.timezone,
       });
       ```  */
      timestamp: zod.z.date(),
      /** When the task was last run (it has been).
      This can be undefined if it's never been run. This date is UTC. */
      lastTimestamp: zod.z.date().optional(),
      /** You can optionally provide an external id when creating the schedule.
      Usually you would use a userId or some other unique identifier.
      This defaults to undefined if you didn't provide one. */
      externalId: zod.z.string().optional(),
      /** The IANA timezone the schedule is set to. The default is UTC.
      * You can see the full list of supported timezones here: https://cloud.trigger.dev/timezones
      */
      timezone: zod.z.string(),
      /** The next 5 dates this task is scheduled to run */
      upcoming: zod.z.array(zod.z.date())
    });
    var CreateScheduleOptions = zod.z.object({
      /** The id of the task you want to attach to. */
      task: zod.z.string(),
      /**  The schedule in CRON format.
         * 
         * ```txt
      *    *    *    *    *    *
      ┬    ┬    ┬    ┬    ┬
      │    │    │    │    |
      │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
      │    │    │    └───── month (1 - 12)
      │    │    └────────── day of month (1 - 31, L)
      │    └─────────────── hour (0 - 23)
      └──────────────────── minute (0 - 59)
         * ```
      
      "L" means the last. In the "day of week" field, 1L means the last Monday of the month. In the day of month field, L means the last day of the month.
      
         */
      cron: zod.z.string(),
      /** You can only create one schedule with this key. If you use it twice, the second call will update the schedule.
      *
      * This is required to prevent you from creating duplicate schedules. */
      deduplicationKey: zod.z.string(),
      /** Optionally, you can specify your own IDs (like a user ID) and then use it inside the run function of your task.
      *
      * This allows you to have per-user CRON tasks.
      */
      externalId: zod.z.string().optional(),
      /** Optionally, you can specify a timezone in the IANA format. If unset it will use UTC.
      * If specified then the CRON will be evaluated in that timezone and will respect daylight savings.
      *
      * If you set the CRON to `0 0 * * *` and the timezone to `America/New_York` then the task will run at midnight in New York time, no matter whether it's daylight savings or not.
      *
      * You can see the full list of supported timezones here: https://cloud.trigger.dev/timezones
      *
      * @example "America/New_York", "Europe/London", "Asia/Tokyo", "Africa/Cairo"
      *
      */
      timezone: zod.z.string().optional()
    });
    CreateScheduleOptions.omit({
      deduplicationKey: true
    });
    var ScheduleGenerator = zod.z.object({
      type: zod.z.literal("CRON"),
      expression: zod.z.string(),
      description: zod.z.string()
    });
    var ScheduleObject = zod.z.object({
      id: zod.z.string(),
      type: ScheduleType,
      task: zod.z.string(),
      active: zod.z.boolean(),
      deduplicationKey: zod.z.string().nullish(),
      externalId: zod.z.string().nullish(),
      generator: ScheduleGenerator,
      timezone: zod.z.string(),
      nextRun: zod.z.coerce.date().nullish(),
      environments: zod.z.array(zod.z.object({
        id: zod.z.string(),
        type: zod.z.string(),
        userName: zod.z.string().nullish()
      }))
    });
    var DeletedScheduleObject = zod.z.object({
      id: zod.z.string()
    });
    zod.z.object({
      data: zod.z.array(ScheduleObject),
      pagination: zod.z.object({
        currentPage: zod.z.number(),
        totalPages: zod.z.number(),
        count: zod.z.number()
      })
    });
    zod.z.object({
      page: zod.z.number().optional(),
      perPage: zod.z.number().optional()
    });
    zod.z.object({
      timezones: zod.z.array(zod.z.string())
    });
    var RunStatus = zod.z.enum([
      /// Task hasn't been deployed yet but is waiting to be executed
      "WAITING_FOR_DEPLOY",
      /// Task is waiting to be executed by a worker
      "QUEUED",
      /// Task is currently being executed by a worker
      "EXECUTING",
      /// Task has failed and is waiting to be retried
      "REATTEMPTING",
      /// Task has been paused by the system, and will be resumed by the system
      "FROZEN",
      /// Task has been completed successfully
      "COMPLETED",
      /// Task has been canceled by the user
      "CANCELED",
      /// Task has been completed with errors
      "FAILED",
      /// Task has crashed and won't be retried, most likely the worker ran out of resources, e.g. memory or storage
      "CRASHED",
      /// Task was interrupted during execution, mostly this happens in development environments
      "INTERRUPTED",
      /// Task has failed to complete, due to an error in the system
      "SYSTEM_FAILURE",
      /// Task has been scheduled to run at a specific time
      "DELAYED",
      /// Task has expired and won't be executed
      "EXPIRED"
    ]);
    var AttemptStatus = zod.z.enum([
      "PENDING",
      "EXECUTING",
      "PAUSED",
      "COMPLETED",
      "FAILED",
      "CANCELED"
    ]);
    var RunEnvironmentDetails = zod.z.object({
      id: zod.z.string(),
      name: zod.z.string(),
      user: zod.z.string().optional()
    });
    var RunScheduleDetails = zod.z.object({
      id: zod.z.string(),
      externalId: zod.z.string().optional(),
      deduplicationKey: zod.z.string().optional(),
      generator: ScheduleGenerator
    });
    var CommonRunFields = {
      id: zod.z.string(),
      status: RunStatus,
      taskIdentifier: zod.z.string(),
      idempotencyKey: zod.z.string().optional(),
      version: zod.z.string().optional(),
      isQueued: zod.z.boolean(),
      isExecuting: zod.z.boolean(),
      isCompleted: zod.z.boolean(),
      isSuccess: zod.z.boolean(),
      isFailed: zod.z.boolean(),
      isCancelled: zod.z.boolean(),
      isTest: zod.z.boolean(),
      createdAt: zod.z.coerce.date(),
      updatedAt: zod.z.coerce.date(),
      startedAt: zod.z.coerce.date().optional(),
      finishedAt: zod.z.coerce.date().optional(),
      delayedUntil: zod.z.coerce.date().optional(),
      ttl: zod.z.string().optional(),
      expiredAt: zod.z.coerce.date().optional(),
      tags: zod.z.string().array(),
      costInCents: zod.z.number(),
      baseCostInCents: zod.z.number(),
      durationMs: zod.z.number()
    };
    var RetrieveRunResponse = zod.z.object({
      ...CommonRunFields,
      payload: zod.z.any().optional(),
      payloadPresignedUrl: zod.z.string().optional(),
      output: zod.z.any().optional(),
      outputPresignedUrl: zod.z.string().optional(),
      schedule: RunScheduleDetails.optional(),
      attempts: zod.z.array(zod.z.object({
        id: zod.z.string(),
        status: AttemptStatus,
        createdAt: zod.z.coerce.date(),
        updatedAt: zod.z.coerce.date(),
        startedAt: zod.z.coerce.date().optional(),
        completedAt: zod.z.coerce.date().optional(),
        error: SerializedError.optional()
      }).optional())
    });
    var ListRunResponseItem = zod.z.object({
      ...CommonRunFields,
      env: RunEnvironmentDetails
    });
    zod.z.object({
      data: zod.z.array(ListRunResponseItem),
      pagination: zod.z.object({
        next: zod.z.string().optional(),
        previous: zod.z.string().optional()
      })
    });
    zod.z.object({
      name: zod.z.string(),
      value: zod.z.string()
    });
    zod.z.object({
      value: zod.z.string()
    });
    zod.z.object({
      variables: zod.z.record(zod.z.string()),
      override: zod.z.boolean().optional()
    });
    var EnvironmentVariableResponseBody = zod.z.object({
      success: zod.z.boolean()
    });
    var EnvironmentVariableValue = zod.z.object({
      value: zod.z.string()
    });
    var EnvironmentVariable = zod.z.object({
      name: zod.z.string(),
      value: zod.z.string()
    });
    var EnvironmentVariables = zod.z.array(EnvironmentVariable);
    var defaultRetryOptions = {
      maxAttempts: 3,
      factor: 2,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 6e4,
      randomize: true
    };
    function calculateNextRetryDelay(options, attempt) {
      const opts = {
        ...defaultRetryOptions,
        ...options
      };
      if (attempt >= opts.maxAttempts) {
        return;
      }
      const { factor, minTimeoutInMs, maxTimeoutInMs, randomize } = opts;
      const random = randomize ? Math.random() + 1 : 1;
      const timeout = Math.min(maxTimeoutInMs, random * minTimeoutInMs * Math.pow(factor, attempt - 1));
      return Math.round(timeout);
    }
    __name(calculateNextRetryDelay, "calculateNextRetryDelay");
    var _ApiError = class _ApiError2 extends Error {
      constructor(status, error, message, headers) {
        super(`${_ApiError2.makeMessage(status, error, message)}`);
        this.name = "TriggerApiError";
        this.status = status;
        this.headers = headers;
        const data = error;
        this.error = data;
        this.code = data?.["code"];
        this.param = data?.["param"];
        this.type = data?.["type"];
      }
      static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status) {
          return new ApiConnectionError({
            cause: castToError(errorResponse)
          });
        }
        const error = errorResponse?.["error"];
        if (status === 400) {
          return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
          return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
          return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
          return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
          return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
          return new InternalServerError(status, error, message, headers);
        }
        return new _ApiError2(status, error, message, headers);
      }
    };
    __name(_ApiError, "ApiError");
    var ApiError = _ApiError;
    var _ApiConnectionError = class _ApiConnectionError extends ApiError {
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        __publicField(this, "status");
        if (cause)
          this.cause = cause;
      }
    };
    __name(_ApiConnectionError, "ApiConnectionError");
    var ApiConnectionError = _ApiConnectionError;
    var _BadRequestError = class _BadRequestError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 400);
      }
    };
    __name(_BadRequestError, "BadRequestError");
    var BadRequestError = _BadRequestError;
    var _AuthenticationError = class _AuthenticationError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 401);
      }
    };
    __name(_AuthenticationError, "AuthenticationError");
    var AuthenticationError = _AuthenticationError;
    var _PermissionDeniedError = class _PermissionDeniedError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 403);
      }
    };
    __name(_PermissionDeniedError, "PermissionDeniedError");
    var PermissionDeniedError = _PermissionDeniedError;
    var _NotFoundError = class _NotFoundError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 404);
      }
    };
    __name(_NotFoundError, "NotFoundError");
    var NotFoundError = _NotFoundError;
    var _ConflictError = class _ConflictError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 409);
      }
    };
    __name(_ConflictError, "ConflictError");
    var ConflictError = _ConflictError;
    var _UnprocessableEntityError = class _UnprocessableEntityError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 422);
      }
    };
    __name(_UnprocessableEntityError, "UnprocessableEntityError");
    var UnprocessableEntityError = _UnprocessableEntityError;
    var _RateLimitError = class _RateLimitError extends ApiError {
      constructor() {
        super(...arguments);
        __publicField(this, "status", 429);
      }
      get millisecondsUntilReset() {
        const resetAtUnixEpochMs = (this.headers ?? {})["x-ratelimit-reset"];
        if (typeof resetAtUnixEpochMs === "string") {
          const resetAtUnixEpoch = parseInt(resetAtUnixEpochMs, 10);
          if (isNaN(resetAtUnixEpoch)) {
            return;
          }
          return Math.max(resetAtUnixEpoch - Date.now() + Math.floor(Math.random() * 2e3), 0);
        }
      }
    };
    __name(_RateLimitError, "RateLimitError");
    var RateLimitError = _RateLimitError;
    var _InternalServerError = class _InternalServerError extends ApiError {
    };
    __name(_InternalServerError, "InternalServerError");
    var InternalServerError = _InternalServerError;
    function castToError(err) {
      if (err instanceof Error)
        return err;
      return new Error(err);
    }
    __name(castToError, "castToError");
    function accessoryAttributes(accessory) {
      return flattenAttributes(accessory, SemanticInternalAttributes.STYLE_ACCESSORY);
    }
    __name(accessoryAttributes, "accessoryAttributes");
    var _CursorPage = class _CursorPage {
      constructor(data, pagination, pageFetcher) {
        this.pageFetcher = pageFetcher;
        this.data = data;
        this.pagination = pagination;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        return !!this.pagination.next;
      }
      hasPreviousPage() {
        return !!this.pagination.previous;
      }
      getNextPage() {
        if (!this.pagination.next) {
          throw new Error("No next page available");
        }
        return this.pageFetcher({
          after: this.pagination.next
        });
      }
      getPreviousPage() {
        if (!this.pagination.previous) {
          throw new Error("No previous page available");
        }
        return this.pageFetcher({
          before: this.pagination.previous
        });
      }
      async *iterPages() {
        let page = this;
        yield page;
        while (page.hasNextPage()) {
          page = await page.getNextPage();
          yield page;
        }
      }
      async *[Symbol.asyncIterator]() {
        for await (const page of this.iterPages()) {
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      }
    };
    __name(_CursorPage, "CursorPage");
    var CursorPage = _CursorPage;
    var _OffsetLimitPage = class _OffsetLimitPage {
      constructor(data, pagination, pageFetcher) {
        this.pageFetcher = pageFetcher;
        this.data = data;
        this.pagination = pagination;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        return this.pagination.currentPage < this.pagination.totalPages;
      }
      hasPreviousPage() {
        return this.pagination.currentPage > 1;
      }
      getNextPage() {
        if (!this.hasNextPage()) {
          throw new Error("No next page available");
        }
        return this.pageFetcher({
          page: this.pagination.currentPage + 1
        });
      }
      getPreviousPage() {
        if (!this.hasPreviousPage()) {
          throw new Error("No previous page available");
        }
        return this.pageFetcher({
          page: this.pagination.currentPage - 1
        });
      }
      async *iterPages() {
        let page = this;
        yield page;
        while (page.hasNextPage()) {
          page = await page.getNextPage();
          yield page;
        }
      }
      async *[Symbol.asyncIterator]() {
        for await (const page of this.iterPages()) {
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      }
    };
    __name(_OffsetLimitPage, "OffsetLimitPage");
    var OffsetLimitPage = _OffsetLimitPage;
    var defaultRetryOptions2 = {
      maxAttempts: 3,
      factor: 2,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 6e4,
      randomize: false
    };
    function zodfetch(schema, url, requestInit, options) {
      return new ApiPromise(_doZodFetch(schema, url, requestInit, options));
    }
    __name(zodfetch, "zodfetch");
    function zodfetchCursorPage(schema, url, params, requestInit, options) {
      const query = new URLSearchParams(params.query);
      if (params.limit) {
        query.set("page[size]", String(params.limit));
      }
      if (params.after) {
        query.set("page[after]", params.after);
      }
      if (params.before) {
        query.set("page[before]", params.before);
      }
      const cursorPageSchema = zod.z.object({
        data: zod.z.array(schema),
        pagination: zod.z.object({
          next: zod.z.string().optional(),
          previous: zod.z.string().optional()
        })
      });
      const $url = new URL(url);
      $url.search = query.toString();
      const fetchResult = _doZodFetch(cursorPageSchema, $url.href, requestInit, options);
      return new CursorPagePromise(fetchResult, schema, url, params, requestInit, options);
    }
    __name(zodfetchCursorPage, "zodfetchCursorPage");
    function zodfetchOffsetLimitPage(schema, url, params, requestInit, options) {
      const query = new URLSearchParams(params.query);
      if (params.limit) {
        query.set("perPage", String(params.limit));
      }
      if (params.page) {
        query.set("page", String(params.page));
      }
      const offsetLimitPageSchema = zod.z.object({
        data: zod.z.array(schema),
        pagination: zod.z.object({
          currentPage: zod.z.coerce.number(),
          totalPages: zod.z.coerce.number(),
          count: zod.z.coerce.number()
        })
      });
      const $url = new URL(url);
      $url.search = query.toString();
      const fetchResult = _doZodFetch(offsetLimitPageSchema, $url.href, requestInit, options);
      return new OffsetLimitPagePromise(fetchResult, schema, url, params, requestInit, options);
    }
    __name(zodfetchOffsetLimitPage, "zodfetchOffsetLimitPage");
    async function traceZodFetch(params, callback) {
      if (!params.options?.tracer) {
        return callback();
      }
      const url = new URL(params.url);
      const method = params.requestInit?.method ?? "GET";
      const name = params.options.name ?? `${method} ${url.pathname}`;
      return await params.options.tracer.startActiveSpan(name, async (span) => {
        return await callback(span);
      }, {
        attributes: {
          [SemanticInternalAttributes.STYLE_ICON]: params.options?.icon ?? "api",
          ...params.options.attributes
        }
      });
    }
    __name(traceZodFetch, "traceZodFetch");
    async function _doZodFetch(schema, url, requestInit, options) {
      const $requestInit = await requestInit;
      return traceZodFetch({
        url,
        requestInit: $requestInit,
        options
      }, async (span) => {
        const result = await _doZodFetchWithRetries(schema, url, $requestInit, options);
        if (options?.onResponseBody && span) {
          options.onResponseBody(result.data, span);
        }
        return result;
      });
    }
    __name(_doZodFetch, "_doZodFetch");
    async function _doZodFetchWithRetries(schema, url, requestInit, options, attempt = 1) {
      try {
        const response = await fetch(url, requestInitWithCache(requestInit));
        const responseHeaders = createResponseHeaders(response.headers);
        if (!response.ok) {
          const retryResult = shouldRetry(response, attempt, options?.retry);
          if (retryResult.retry) {
            await waitForRetry(url, attempt + 1, retryResult.delay, options, requestInit, response);
            return await _doZodFetchWithRetries(schema, url, requestInit, options, attempt + 1);
          } else {
            const errText = await response.text().catch((e) => castToError2(e).message);
            const errJSON = safeJsonParse(errText);
            const errMessage = errJSON ? void 0 : errText;
            throw ApiError.generate(response.status, errJSON, errMessage, responseHeaders);
          }
        }
        const jsonBody = await response.json();
        const parsedResult = schema.safeParse(jsonBody);
        if (parsedResult.success) {
          return {
            data: parsedResult.data,
            response
          };
        }
        throw zodValidationError.fromZodError(parsedResult.error);
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        if (options?.retry) {
          const retry = {
            ...defaultRetryOptions2,
            ...options.retry
          };
          const delay = calculateNextRetryDelay(retry, attempt);
          if (delay) {
            await waitForRetry(url, attempt + 1, delay, options, requestInit);
            return await _doZodFetchWithRetries(schema, url, requestInit, options, attempt + 1);
          }
        }
        throw new ApiConnectionError({
          cause: castToError2(error)
        });
      }
    }
    __name(_doZodFetchWithRetries, "_doZodFetchWithRetries");
    function castToError2(err) {
      if (err instanceof Error)
        return err;
      return new Error(err);
    }
    __name(castToError2, "castToError");
    function shouldRetry(response, attempt, retryOptions) {
      function shouldRetryForOptions() {
        const retry = {
          ...defaultRetryOptions2,
          ...retryOptions
        };
        const delay = calculateNextRetryDelay(retry, attempt);
        if (delay) {
          return {
            retry: true,
            delay
          };
        } else {
          return {
            retry: false
          };
        }
      }
      __name(shouldRetryForOptions, "shouldRetryForOptions");
      const shouldRetryHeader = response.headers.get("x-should-retry");
      if (shouldRetryHeader === "true")
        return shouldRetryForOptions();
      if (shouldRetryHeader === "false")
        return {
          retry: false
        };
      if (response.status === 408)
        return shouldRetryForOptions();
      if (response.status === 409)
        return shouldRetryForOptions();
      if (response.status === 429) {
        if (attempt >= (typeof retryOptions?.maxAttempts === "number" ? retryOptions?.maxAttempts : 3)) {
          return {
            retry: false
          };
        }
        const resetAtUnixEpochMs = response.headers.get("x-ratelimit-reset");
        if (resetAtUnixEpochMs) {
          const resetAtUnixEpoch = parseInt(resetAtUnixEpochMs, 10);
          const delay = resetAtUnixEpoch - Date.now() + Math.floor(Math.random() * 1e3);
          if (delay > 0) {
            return {
              retry: true,
              delay
            };
          }
        }
        return shouldRetryForOptions();
      }
      if (response.status >= 500)
        return shouldRetryForOptions();
      return {
        retry: false
      };
    }
    __name(shouldRetry, "shouldRetry");
    function safeJsonParse(text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        return void 0;
      }
    }
    __name(safeJsonParse, "safeJsonParse");
    function createResponseHeaders(headers) {
      return new Proxy(Object.fromEntries(
        // @ts-ignore
        headers.entries()
      ), {
        get(target, name) {
          const key = name.toString();
          return target[key.toLowerCase()] || target[key];
        }
      });
    }
    __name(createResponseHeaders, "createResponseHeaders");
    function requestInitWithCache(requestInit) {
      try {
        const withCache = {
          ...requestInit,
          cache: "no-cache"
        };
        const _ = new Request("http://localhost", withCache);
        return withCache;
      } catch (error) {
        return requestInit ?? {};
      }
    }
    __name(requestInitWithCache, "requestInitWithCache");
    var _ApiPromise = class _ApiPromise extends Promise {
      constructor(responsePromise) {
        super((resolve) => {
          resolve(null);
        });
        this.responsePromise = responsePromise;
      }
      /**
      * Gets the raw `Response` instance instead of parsing the response
      * data.
      *
      * If you want to parse the response body but still get the `Response`
      * instance, you can use {@link withResponse()}.
      */
      asResponse() {
        return this.responsePromise.then((p) => p.response);
      }
      /**
      * Gets the parsed response data and the raw `Response` instance.
      *
      * If you just want to get the raw `Response` instance without parsing it,
      * you can use {@link asResponse()}.
      */
      async withResponse() {
        const [data, response] = await Promise.all([
          this.parse(),
          this.asResponse()
        ]);
        return {
          data,
          response
        };
      }
      parse() {
        return this.responsePromise.then((result) => result.data);
      }
      then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.parse().catch(onrejected);
      }
      finally(onfinally) {
        return this.parse().finally(onfinally);
      }
    };
    __name(_ApiPromise, "ApiPromise");
    var ApiPromise = _ApiPromise;
    var _fetchPage;
    var fetchPage_fn;
    var _CursorPagePromise = class _CursorPagePromise extends ApiPromise {
      constructor(result, schema, url, params, requestInit, options) {
        super(result.then((result2) => ({
          data: new CursorPage(result2.data.data, result2.data.pagination, __privateMethod(this, _fetchPage, fetchPage_fn).bind(this)),
          response: result2.response
        })));
        __privateAdd(this, _fetchPage);
        this.schema = schema;
        this.url = url;
        this.params = params;
        this.requestInit = requestInit;
        this.options = options;
      }
      /**
      * Allow auto-paginating iteration on an unawaited list call, eg:
      *
      *    for await (const item of client.items.list()) {
      *      console.log(item)
      *    }
      */
      async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
          yield item;
        }
      }
    };
    _fetchPage = /* @__PURE__ */ new WeakSet();
    fetchPage_fn = /* @__PURE__ */ __name(function(params) {
      return zodfetchCursorPage(this.schema, this.url, {
        ...this.params,
        ...params
      }, this.requestInit, this.options);
    }, "#fetchPage");
    __name(_CursorPagePromise, "CursorPagePromise");
    var CursorPagePromise = _CursorPagePromise;
    var _fetchPage2;
    var fetchPage_fn2;
    var _OffsetLimitPagePromise = class _OffsetLimitPagePromise extends ApiPromise {
      constructor(result, schema, url, params, requestInit, options) {
        super(result.then((result2) => ({
          data: new OffsetLimitPage(result2.data.data, result2.data.pagination, __privateMethod(this, _fetchPage2, fetchPage_fn2).bind(this)),
          response: result2.response
        })));
        __privateAdd(this, _fetchPage2);
        this.schema = schema;
        this.url = url;
        this.params = params;
        this.requestInit = requestInit;
        this.options = options;
      }
      /**
      * Allow auto-paginating iteration on an unawaited list call, eg:
      *
      *    for await (const item of client.items.list()) {
      *      console.log(item)
      *    }
      */
      async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
          yield item;
        }
      }
    };
    _fetchPage2 = /* @__PURE__ */ new WeakSet();
    fetchPage_fn2 = /* @__PURE__ */ __name(function(params1) {
      return zodfetchOffsetLimitPage(this.schema, this.url, {
        ...this.params,
        ...params1
      }, this.requestInit, this.options);
    }, "#fetchPage");
    __name(_OffsetLimitPagePromise, "OffsetLimitPagePromise");
    var OffsetLimitPagePromise = _OffsetLimitPagePromise;
    async function waitForRetry(url, attempt, delay, options, requestInit, response) {
      if (options?.tracer) {
        const method = requestInit?.method ?? "GET";
        return options.tracer.startActiveSpan(response ? `wait after ${response.status}` : `wait after error`, async (span) => {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "wait",
            ...accessoryAttributes({
              items: [
                {
                  text: `retrying ${options?.name ?? method.toUpperCase()} in ${delay}ms`,
                  variant: "normal"
                }
              ],
              style: "codepath"
            })
          }
        });
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    __name(waitForRetry, "waitForRetry");
    var DEFAULT_ZOD_FETCH_OPTIONS = {
      retry: {
        maxAttempts: 3,
        minTimeoutInMs: 1e3,
        maxTimeoutInMs: 3e4,
        factor: 2,
        randomize: false
      }
    };
    var _getHeaders;
    var getHeaders_fn;
    var _ApiClient = class _ApiClient {
      constructor(baseUrl, accessToken, requestOptions = {}) {
        __privateAdd(this, _getHeaders);
        this.accessToken = accessToken;
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.defaultRequestOptions = mergeRequestOptions(DEFAULT_ZOD_FETCH_OPTIONS, requestOptions);
      }
      async getRunResult(runId, requestOptions) {
        try {
          return await zodfetch(TaskRunExecutionResult, `${this.baseUrl}/api/v1/runs/${runId}/result`, {
            method: "GET",
            headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
          }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
        } catch (error) {
          if (error instanceof ApiError) {
            if (error.status === 404) {
              return void 0;
            }
          }
          throw error;
        }
      }
      async getBatchResults(batchId, requestOptions) {
        return await zodfetch(BatchTaskRunExecutionResult, `${this.baseUrl}/api/v1/batches/${batchId}/results`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      triggerTask(taskId, body, options, requestOptions) {
        const encodedTaskId = encodeURIComponent(taskId);
        return zodfetch(TriggerTaskResponse, `${this.baseUrl}/api/v1/tasks/${encodedTaskId}/trigger`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, options?.spanParentAsLink ?? false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      batchTriggerTask(taskId, body, options, requestOptions) {
        const encodedTaskId = encodeURIComponent(taskId);
        return zodfetch(BatchTriggerTaskResponse, `${this.baseUrl}/api/v1/tasks/${encodedTaskId}/batch`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, options?.spanParentAsLink ?? false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      createUploadPayloadUrl(filename, requestOptions) {
        return zodfetch(CreateUploadPayloadUrlResponseBody, `${this.baseUrl}/api/v1/packets/${filename}`, {
          method: "PUT",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      getPayloadUrl(filename, requestOptions) {
        return zodfetch(CreateUploadPayloadUrlResponseBody, `${this.baseUrl}/api/v1/packets/${filename}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      retrieveRun(runId, requestOptions) {
        return zodfetch(RetrieveRunResponse, `${this.baseUrl}/api/v3/runs/${runId}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listRuns(query, requestOptions) {
        const searchParams = createSearchQueryForListRuns(query);
        return zodfetchCursorPage(ListRunResponseItem, `${this.baseUrl}/api/v1/runs`, {
          query: searchParams,
          limit: query?.limit,
          after: query?.after,
          before: query?.before
        }, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listProjectRuns(projectRef, query, requestOptions) {
        const searchParams = createSearchQueryForListRuns(query);
        if (query?.env) {
          searchParams.append("filter[env]", Array.isArray(query.env) ? query.env.join(",") : query.env);
        }
        return zodfetchCursorPage(ListRunResponseItem, `${this.baseUrl}/api/v1/projects/${projectRef}/runs`, {
          query: searchParams,
          limit: query?.limit,
          after: query?.after,
          before: query?.before
        }, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      replayRun(runId, requestOptions) {
        return zodfetch(ReplayRunResponse, `${this.baseUrl}/api/v1/runs/${runId}/replay`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      cancelRun(runId, requestOptions) {
        return zodfetch(CanceledRunResponse, `${this.baseUrl}/api/v2/runs/${runId}/cancel`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      rescheduleRun(runId, body, requestOptions) {
        return zodfetch(RetrieveRunResponse, `${this.baseUrl}/api/v1/runs/${runId}/reschedule`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      addTags(runId, body, requestOptions) {
        return zodfetch(zod.z.object({
          message: zod.z.string()
        }), `${this.baseUrl}/api/v1/runs/${runId}/tags`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      createSchedule(options, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(options)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listSchedules(options, requestOptions) {
        const searchParams = new URLSearchParams();
        if (options?.page) {
          searchParams.append("page", options.page.toString());
        }
        if (options?.perPage) {
          searchParams.append("perPage", options.perPage.toString());
        }
        return zodfetchOffsetLimitPage(ScheduleObject, `${this.baseUrl}/api/v1/schedules`, {
          page: options?.page,
          limit: options?.perPage
        }, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      retrieveSchedule(scheduleId, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      updateSchedule(scheduleId, options, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
          method: "PUT",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(options)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      deactivateSchedule(scheduleId, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}/deactivate`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      activateSchedule(scheduleId, requestOptions) {
        return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}/activate`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      deleteSchedule(scheduleId, requestOptions) {
        return zodfetch(DeletedScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
          method: "DELETE",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      listEnvVars(projectRef, slug, requestOptions) {
        return zodfetch(EnvironmentVariables, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      importEnvVars(projectRef, slug, body, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/import`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      retrieveEnvVar(projectRef, slug, key, requestOptions) {
        return zodfetch(EnvironmentVariableValue, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
          method: "GET",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      createEnvVar(projectRef, slug, body, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}`, {
          method: "POST",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      updateEnvVar(projectRef, slug, key, body, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
          method: "PUT",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false),
          body: JSON.stringify(body)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
      deleteEnvVar(projectRef, slug, key, requestOptions) {
        return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
          method: "DELETE",
          headers: __privateMethod(this, _getHeaders, getHeaders_fn).call(this, false)
        }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
      }
    };
    _getHeaders = /* @__PURE__ */ new WeakSet();
    getHeaders_fn = /* @__PURE__ */ __name(function(spanParentAsLink) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
        "trigger-version": version2
      };
      if (taskContext.isInsideTask) {
        headers["x-trigger-worker"] = "true";
        api.propagation.inject(api.context.active(), headers);
        if (spanParentAsLink) {
          headers["x-trigger-span-parent-as-link"] = "1";
        }
      }
      return headers;
    }, "#getHeaders");
    __name(_ApiClient, "ApiClient");
    var ApiClient = _ApiClient;
    function createSearchQueryForListRuns(query) {
      const searchParams = new URLSearchParams();
      if (query) {
        if (query.status) {
          searchParams.append("filter[status]", Array.isArray(query.status) ? query.status.join(",") : query.status);
        }
        if (query.taskIdentifier) {
          searchParams.append("filter[taskIdentifier]", Array.isArray(query.taskIdentifier) ? query.taskIdentifier.join(",") : query.taskIdentifier);
        }
        if (query.version) {
          searchParams.append("filter[version]", Array.isArray(query.version) ? query.version.join(",") : query.version);
        }
        if (query.bulkAction) {
          searchParams.append("filter[bulkAction]", query.bulkAction);
        }
        if (query.tag) {
          searchParams.append("filter[tag]", Array.isArray(query.tag) ? query.tag.join(",") : query.tag);
        }
        if (query.schedule) {
          searchParams.append("filter[schedule]", query.schedule);
        }
        if (typeof query.isTest === "boolean") {
          searchParams.append("filter[isTest]", String(query.isTest));
        }
        if (query.from) {
          searchParams.append("filter[createdAt][from]", query.from instanceof Date ? query.from.getTime().toString() : query.from.toString());
        }
        if (query.to) {
          searchParams.append("filter[createdAt][to]", query.to instanceof Date ? query.to.getTime().toString() : query.to.toString());
        }
        if (query.period) {
          searchParams.append("filter[createdAt][period]", query.period);
        }
      }
      return searchParams;
    }
    __name(createSearchQueryForListRuns, "createSearchQueryForListRuns");
    function mergeRequestOptions(defaultOptions, options) {
      if (!options) {
        return defaultOptions;
      }
      return {
        ...defaultOptions,
        ...options,
        retry: {
          ...defaultOptions.retry,
          ...options.retry
        }
      };
    }
    __name(mergeRequestOptions, "mergeRequestOptions");
    var API_NAME2 = "api-client";
    var _getConfig;
    var getConfig_fn;
    var _APIClientManagerAPI = class _APIClientManagerAPI2 {
      constructor() {
        __privateAdd(this, _getConfig);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _APIClientManagerAPI2();
        }
        return this._instance;
      }
      disable() {
        unregisterGlobal(API_NAME2);
      }
      setGlobalAPIClientConfiguration(config2) {
        return registerGlobal(API_NAME2, config2);
      }
      get baseURL() {
        const store = __privateMethod(this, _getConfig, getConfig_fn).call(this);
        return store?.baseURL ?? getEnvVar2("TRIGGER_API_URL") ?? "https://api.trigger.dev";
      }
      get accessToken() {
        const store = __privateMethod(this, _getConfig, getConfig_fn).call(this);
        return store?.secretKey ?? getEnvVar2("TRIGGER_SECRET_KEY") ?? getEnvVar2("TRIGGER_ACCESS_TOKEN");
      }
      get client() {
        if (!this.baseURL || !this.accessToken) {
          return void 0;
        }
        return new ApiClient(this.baseURL, this.accessToken);
      }
    };
    _getConfig = /* @__PURE__ */ new WeakSet();
    getConfig_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME2);
    }, "#getConfig");
    __name(_APIClientManagerAPI, "APIClientManagerAPI");
    var APIClientManagerAPI = _APIClientManagerAPI;
    var apiClientManager = APIClientManagerAPI.getInstance();
    async function parsePacket(value) {
      if (!value.data) {
        return void 0;
      }
      switch (value.dataType) {
        case "application/json":
          return JSON.parse(value.data);
        case "application/super+json":
          const { parse } = await loadSuperJSON();
          return parse(value.data);
        case "text/plain":
          return value.data;
        case "application/store":
          throw new Error(`Cannot parse an application/store packet (${value.data}). Needs to be imported first.`);
        default:
          return value.data;
      }
    }
    __name(parsePacket, "parsePacket");
    async function stringifyIO(value) {
      if (value === void 0) {
        return {
          dataType: "application/json"
        };
      }
      if (typeof value === "string") {
        return {
          data: value,
          dataType: "text/plain"
        };
      }
      try {
        const { stringify } = await loadSuperJSON();
        const data = stringify(value);
        return {
          data,
          dataType: "application/super+json"
        };
      } catch {
        return {
          data: value,
          dataType: "application/json"
        };
      }
    }
    __name(stringifyIO, "stringifyIO");
    async function conditionallyExportPacket(packet, pathPrefix, tracer2) {
      if (apiClientManager.client) {
        const { needsOffloading, size } = packetRequiresOffloading(packet);
        if (needsOffloading) {
          if (!tracer2) {
            return await exportPacket(packet, pathPrefix);
          } else {
            const result = await tracer2.startActiveSpan("store.uploadOutput", async (span) => {
              return await exportPacket(packet, pathPrefix);
            }, {
              attributes: {
                byteLength: size,
                [SemanticInternalAttributes.STYLE_ICON]: "cloud-upload"
              }
            });
            return result ?? packet;
          }
        }
      }
      return packet;
    }
    __name(conditionallyExportPacket, "conditionallyExportPacket");
    function packetRequiresOffloading(packet, lengthLimit) {
      if (!packet.data) {
        return {
          needsOffloading: false,
          size: 0
        };
      }
      const byteSize = Buffer.byteLength(packet.data, "utf8");
      return {
        needsOffloading: byteSize >= (lengthLimit ?? OFFLOAD_IO_PACKET_LENGTH_LIMIT),
        size: byteSize
      };
    }
    __name(packetRequiresOffloading, "packetRequiresOffloading");
    async function exportPacket(packet, pathPrefix) {
      const filename = `${pathPrefix}.${getPacketExtension(packet.dataType)}`;
      const presignedResponse = await apiClientManager.client.createUploadPayloadUrl(filename);
      const uploadResponse = await fetch(presignedResponse.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": packet.dataType
        },
        body: packet.data
      });
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload output to ${presignedResponse.presignedUrl}: ${uploadResponse.statusText}`);
      }
      return {
        data: filename,
        dataType: "application/store"
      };
    }
    __name(exportPacket, "exportPacket");
    async function conditionallyImportPacket(packet, tracer2) {
      if (packet.dataType !== "application/store") {
        return packet;
      }
      if (!tracer2) {
        return await importPacket(packet);
      } else {
        const result = await tracer2.startActiveSpan("store.downloadPayload", async (span) => {
          return await importPacket(packet, span);
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "cloud-download"
          }
        });
        return result ?? packet;
      }
    }
    __name(conditionallyImportPacket, "conditionallyImportPacket");
    async function importPacket(packet, span) {
      if (!packet.data) {
        return packet;
      }
      if (!apiClientManager.client) {
        return packet;
      }
      const presignedResponse = await apiClientManager.client.getPayloadUrl(packet.data);
      const response = await fetch(presignedResponse.presignedUrl);
      if (!response.ok) {
        throw new Error(`Failed to import packet ${presignedResponse.presignedUrl}: ${response.statusText}`);
      }
      const data = await response.text();
      span?.setAttribute("size", Buffer.byteLength(data, "utf8"));
      return {
        data,
        dataType: response.headers.get("content-type") ?? "application/json"
      };
    }
    __name(importPacket, "importPacket");
    async function createPacketAttributes(packet, dataKey, dataTypeKey) {
      if (!packet.data) {
        return;
      }
      switch (packet.dataType) {
        case "application/json":
          return {
            ...flattenAttributes(packet, dataKey),
            [dataTypeKey]: packet.dataType
          };
        case "application/super+json":
          const { parse } = await loadSuperJSON();
          if (typeof packet.data === "undefined" || packet.data === null) {
            return;
          }
          try {
            const parsed = parse(packet.data);
            const jsonified = JSON.parse(JSON.stringify(parsed, safeReplacer));
            const result = {
              ...flattenAttributes(jsonified, dataKey),
              [dataTypeKey]: "application/json"
            };
            return result;
          } catch (e) {
            return;
          }
        case "application/store":
          return {
            [dataKey]: packet.data,
            [dataTypeKey]: packet.dataType
          };
        case "text/plain":
          return {
            [dataKey]: packet.data,
            [dataTypeKey]: packet.dataType
          };
        default:
          return;
      }
    }
    __name(createPacketAttributes, "createPacketAttributes");
    function safeReplacer(key, value) {
      if (typeof value === "bigint") {
        return value.toString();
      }
      if (value instanceof RegExp) {
        return value.toString();
      }
      if (value instanceof Set) {
        return Array.from(value);
      }
      if (value instanceof Map) {
        const obj = {};
        value.forEach((v, k) => {
          obj[k] = v;
        });
        return obj;
      }
      return value;
    }
    __name(safeReplacer, "safeReplacer");
    function getPacketExtension(outputType) {
      switch (outputType) {
        case "application/json":
          return "json";
        case "application/super+json":
          return "json";
        case "text/plain":
          return "txt";
        default:
          return "txt";
      }
    }
    __name(getPacketExtension, "getPacketExtension");
    async function loadSuperJSON() {
      return await import("superjson");
    }
    __name(loadSuperJSON, "loadSuperJSON");
    var _callRun;
    var callRun_fn;
    var _callInitFunctions;
    var callInitFunctions_fn;
    var _callConfigInit;
    var callConfigInit_fn;
    var _callOnSuccessFunctions;
    var callOnSuccessFunctions_fn;
    var _callOnSuccessFunction;
    var callOnSuccessFunction_fn;
    var _callOnFailureFunctions;
    var callOnFailureFunctions_fn;
    var _callOnFailureFunction;
    var callOnFailureFunction_fn;
    var _callOnStartFunctions;
    var callOnStartFunctions_fn;
    var _callOnStartFunction;
    var callOnStartFunction_fn;
    var _callTaskCleanup;
    var callTaskCleanup_fn;
    var _handleError;
    var handleError_fn;
    var _TaskExecutor = class _TaskExecutor {
      constructor(task, options) {
        __privateAdd(this, _callRun);
        __privateAdd(this, _callInitFunctions);
        __privateAdd(this, _callConfigInit);
        __privateAdd(this, _callOnSuccessFunctions);
        __privateAdd(this, _callOnSuccessFunction);
        __privateAdd(this, _callOnFailureFunctions);
        __privateAdd(this, _callOnFailureFunction);
        __privateAdd(this, _callOnStartFunctions);
        __privateAdd(this, _callOnStartFunction);
        __privateAdd(this, _callTaskCleanup);
        __privateAdd(this, _handleError);
        this.task = task;
        this._tracingSDK = options.tracingSDK;
        this._tracer = options.tracer;
        this._consoleInterceptor = options.consoleInterceptor;
        this._config = options.projectConfig;
        this._importedConfig = options.importedConfig;
        this._handleErrorFn = options.handleErrorFn;
      }
      async execute(execution, worker, traceContext, usage22) {
        const ctx = TaskRunContext.parse(execution);
        const attemptMessage = `Attempt ${execution.attempt.number}`;
        const originalPacket = {
          data: execution.run.payload,
          dataType: execution.run.payloadType
        };
        taskContext.setGlobalTaskContext({
          ctx,
          worker
        });
        this._tracingSDK.asyncResourceDetector.resolveWithAttributes({
          ...taskContext.attributes,
          [SemanticInternalAttributes.SDK_VERSION]: this.task.packageVersion,
          [SemanticInternalAttributes.SDK_LANGUAGE]: "typescript"
        });
        const result = await this._tracer.startActiveSpan(attemptMessage, async (span) => {
          return await this._consoleInterceptor.intercept(console, async () => {
            let parsedPayload;
            let initOutput;
            try {
              const payloadPacket = await conditionallyImportPacket(originalPacket, this._tracer);
              parsedPayload = await parsePacket(payloadPacket);
              if (execution.attempt.number === 1) {
                await __privateMethod(this, _callOnStartFunctions, callOnStartFunctions_fn).call(this, parsedPayload, ctx);
              }
              initOutput = await __privateMethod(this, _callInitFunctions, callInitFunctions_fn).call(this, parsedPayload, ctx);
              const output = await __privateMethod(this, _callRun, callRun_fn).call(this, parsedPayload, ctx, initOutput);
              await __privateMethod(this, _callOnSuccessFunctions, callOnSuccessFunctions_fn).call(this, parsedPayload, output, ctx, initOutput);
              try {
                const stringifiedOutput = await stringifyIO(output);
                const finalOutput = await conditionallyExportPacket(stringifiedOutput, `${execution.attempt.id}/output`, this._tracer);
                const attributes = await createPacketAttributes(finalOutput, SemanticInternalAttributes.OUTPUT, SemanticInternalAttributes.OUTPUT_TYPE);
                if (attributes) {
                  span.setAttributes(attributes);
                }
                return {
                  ok: true,
                  id: execution.run.id,
                  output: finalOutput.data,
                  outputType: finalOutput.dataType
                };
              } catch (stringifyError) {
                recordSpanException(span, stringifyError);
                return {
                  ok: false,
                  id: execution.run.id,
                  error: {
                    type: "INTERNAL_ERROR",
                    code: TaskRunErrorCodes2.TASK_OUTPUT_ERROR,
                    message: stringifyError instanceof Error ? stringifyError.message : typeof stringifyError === "string" ? stringifyError : void 0
                  }
                };
              }
            } catch (runError) {
              try {
                const handleErrorResult = await __privateMethod(this, _handleError, handleError_fn).call(this, execution, runError, parsedPayload, ctx);
                recordSpanException(span, handleErrorResult.error ?? runError);
                if (handleErrorResult.status !== "retry") {
                  await __privateMethod(this, _callOnFailureFunctions, callOnFailureFunctions_fn).call(this, parsedPayload, handleErrorResult.error ?? runError, ctx, initOutput);
                }
                return {
                  id: execution.run.id,
                  ok: false,
                  error: sanitizeError(handleErrorResult.error ? parseError(handleErrorResult.error) : parseError(runError)),
                  retry: handleErrorResult.status === "retry" ? handleErrorResult.retry : void 0,
                  skippedRetrying: handleErrorResult.status === "skipped"
                };
              } catch (handleErrorError) {
                recordSpanException(span, handleErrorError);
                return {
                  ok: false,
                  id: execution.run.id,
                  error: {
                    type: "INTERNAL_ERROR",
                    code: TaskRunErrorCodes2.HANDLE_ERROR_ERROR,
                    message: handleErrorError instanceof Error ? handleErrorError.message : typeof handleErrorError === "string" ? handleErrorError : void 0
                  }
                };
              }
            } finally {
              await __privateMethod(this, _callTaskCleanup, callTaskCleanup_fn).call(this, parsedPayload, ctx, initOutput);
            }
          });
        }, {
          kind: api.SpanKind.CONSUMER,
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "attempt",
            ...accessoryAttributes({
              items: [
                {
                  text: ctx.task.filePath
                },
                {
                  text: `${ctx.task.exportName}.run()`
                }
              ],
              style: "codepath"
            })
          }
        }, this._tracer.extractContext(traceContext));
        return {
          result
        };
      }
    };
    _callRun = /* @__PURE__ */ new WeakSet();
    callRun_fn = /* @__PURE__ */ __name(async function(payload, ctx, init) {
      const runFn = this.task.fns.run;
      const middlewareFn = this.task.fns.middleware;
      if (!runFn) {
        throw new Error("Task does not have a run function");
      }
      if (!middlewareFn) {
        return runFn(payload, {
          ctx,
          init
        });
      }
      return middlewareFn(payload, {
        ctx,
        next: async () => runFn(payload, {
          ctx,
          init
        })
      });
    }, "#callRun");
    _callInitFunctions = /* @__PURE__ */ new WeakSet();
    callInitFunctions_fn = /* @__PURE__ */ __name(async function(payload1, ctx1) {
      await __privateMethod(this, _callConfigInit, callConfigInit_fn).call(this, payload1, ctx1);
      const initFn = this.task.fns.init;
      if (!initFn) {
        return {};
      }
      return this._tracer.startActiveSpan("init", async (span) => {
        return await initFn(payload1, {
          ctx: ctx1
        });
      }, {
        attributes: {
          [SemanticInternalAttributes.STYLE_ICON]: "function"
        }
      });
    }, "#callInitFunctions");
    _callConfigInit = /* @__PURE__ */ new WeakSet();
    callConfigInit_fn = /* @__PURE__ */ __name(async function(payload2, ctx2) {
      const initFn = this._importedConfig?.init;
      if (!initFn) {
        return {};
      }
      return this._tracer.startActiveSpan("config.init", async (span) => {
        return await initFn(payload2, {
          ctx: ctx2
        });
      }, {
        attributes: {
          [SemanticInternalAttributes.STYLE_ICON]: "function"
        }
      });
    }, "#callConfigInit");
    _callOnSuccessFunctions = /* @__PURE__ */ new WeakSet();
    callOnSuccessFunctions_fn = /* @__PURE__ */ __name(async function(payload3, output, ctx3, initOutput) {
      await __privateMethod(this, _callOnSuccessFunction, callOnSuccessFunction_fn).call(this, this.task.fns.onSuccess, "task.onSuccess", payload3, output, ctx3, initOutput);
      await __privateMethod(this, _callOnSuccessFunction, callOnSuccessFunction_fn).call(this, this._importedConfig?.onSuccess, "config.onSuccess", payload3, output, ctx3, initOutput);
    }, "#callOnSuccessFunctions");
    _callOnSuccessFunction = /* @__PURE__ */ new WeakSet();
    callOnSuccessFunction_fn = /* @__PURE__ */ __name(async function(onSuccessFn, name, payload4, output1, ctx4, initOutput1) {
      if (!onSuccessFn) {
        return;
      }
      try {
        await this._tracer.startActiveSpan(name, async (span) => {
          return await onSuccessFn(payload4, output1, {
            ctx: ctx4,
            init: initOutput1
          });
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "function"
          }
        });
      } catch {
      }
    }, "#callOnSuccessFunction");
    _callOnFailureFunctions = /* @__PURE__ */ new WeakSet();
    callOnFailureFunctions_fn = /* @__PURE__ */ __name(async function(payload5, error, ctx5, initOutput2) {
      await __privateMethod(this, _callOnFailureFunction, callOnFailureFunction_fn).call(this, this.task.fns.onFailure, "task.onFailure", payload5, error, ctx5, initOutput2);
      await __privateMethod(this, _callOnFailureFunction, callOnFailureFunction_fn).call(this, this._importedConfig?.onFailure, "config.onFailure", payload5, error, ctx5, initOutput2);
    }, "#callOnFailureFunctions");
    _callOnFailureFunction = /* @__PURE__ */ new WeakSet();
    callOnFailureFunction_fn = /* @__PURE__ */ __name(async function(onFailureFn, name1, payload6, error1, ctx6, initOutput3) {
      if (!onFailureFn) {
        return;
      }
      try {
        return await this._tracer.startActiveSpan(name1, async (span) => {
          return await onFailureFn(payload6, error1, {
            ctx: ctx6,
            init: initOutput3
          });
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "function"
          }
        });
      } catch (e) {
      }
    }, "#callOnFailureFunction");
    _callOnStartFunctions = /* @__PURE__ */ new WeakSet();
    callOnStartFunctions_fn = /* @__PURE__ */ __name(async function(payload7, ctx7) {
      await __privateMethod(this, _callOnStartFunction, callOnStartFunction_fn).call(this, this._importedConfig?.onStart, "config.onStart", payload7, ctx7, {});
      await __privateMethod(this, _callOnStartFunction, callOnStartFunction_fn).call(this, this.task.fns.onStart, "task.onStart", payload7, ctx7, {});
    }, "#callOnStartFunctions");
    _callOnStartFunction = /* @__PURE__ */ new WeakSet();
    callOnStartFunction_fn = /* @__PURE__ */ __name(async function(onStartFn, name2, payload8, ctx8, initOutput4) {
      if (!onStartFn) {
        return;
      }
      try {
        await this._tracer.startActiveSpan(name2, async (span) => {
          return await onStartFn(payload8, {
            ctx: ctx8
          });
        }, {
          attributes: {
            [SemanticInternalAttributes.STYLE_ICON]: "function"
          }
        });
      } catch {
      }
    }, "#callOnStartFunction");
    _callTaskCleanup = /* @__PURE__ */ new WeakSet();
    callTaskCleanup_fn = /* @__PURE__ */ __name(async function(payload9, ctx9, init1) {
      const cleanupFn = this.task.fns.cleanup;
      if (!cleanupFn) {
        return;
      }
      return this._tracer.startActiveSpan("cleanup", async (span) => {
        return await cleanupFn(payload9, {
          ctx: ctx9,
          init: init1
        });
      });
    }, "#callTaskCleanup");
    _handleError = /* @__PURE__ */ new WeakSet();
    handleError_fn = /* @__PURE__ */ __name(async function(execution, error2, payload10, ctx10) {
      const retriesConfig = this._importedConfig?.retries ?? this._config.retries;
      const retry = this.task.retry ?? retriesConfig?.default;
      if (!retry) {
        return {
          status: "noop"
        };
      }
      if (error2 instanceof Error && error2.name === "AbortTaskRunError") {
        return {
          status: "skipped"
        };
      }
      if (execution.run.maxAttempts) {
        retry.maxAttempts = Math.max(execution.run.maxAttempts, 1);
      }
      let delay = calculateNextRetryDelay(retry, execution.attempt.number);
      if (delay && error2 instanceof Error && error2.name === "TriggerApiError" && error2.status === 429) {
        const rateLimitError = error2;
        delay = rateLimitError.millisecondsUntilReset;
      }
      if (execution.environment.type === "DEVELOPMENT" && typeof retriesConfig?.enabledInDev === "boolean" && !retriesConfig.enabledInDev) {
        return {
          status: "skipped"
        };
      }
      return this._tracer.startActiveSpan("handleError()", async (span) => {
        const handleErrorResult = this.task.fns.handleError ? await this.task.fns.handleError(payload10, error2, {
          ctx: ctx10,
          retry,
          retryDelayInMs: delay,
          retryAt: delay ? new Date(Date.now() + delay) : void 0
        }) : this._importedConfig ? await this._handleErrorFn?.(payload10, error2, {
          ctx: ctx10,
          retry,
          retryDelayInMs: delay,
          retryAt: delay ? new Date(Date.now() + delay) : void 0
        }) : void 0;
        if (!handleErrorResult) {
          return typeof delay === "undefined" ? {
            status: "noop"
          } : {
            status: "retry",
            retry: {
              timestamp: Date.now() + delay,
              delay
            }
          };
        }
        if (handleErrorResult.skipRetrying) {
          return {
            status: "skipped",
            error: handleErrorResult.error
          };
        }
        if (typeof handleErrorResult.retryAt !== "undefined") {
          return {
            status: "retry",
            retry: {
              timestamp: handleErrorResult.retryAt.getTime(),
              delay: handleErrorResult.retryAt.getTime() - Date.now()
            },
            error: handleErrorResult.error
          };
        }
        if (typeof handleErrorResult.retryDelayInMs === "number") {
          return {
            status: "retry",
            retry: {
              timestamp: Date.now() + handleErrorResult.retryDelayInMs,
              delay: handleErrorResult.retryDelayInMs
            },
            error: handleErrorResult.error
          };
        }
        if (handleErrorResult.retry && typeof handleErrorResult.retry === "object") {
          const delay2 = calculateNextRetryDelay(handleErrorResult.retry, execution.attempt.number);
          return typeof delay2 === "undefined" ? {
            status: "noop",
            error: handleErrorResult.error
          } : {
            status: "retry",
            retry: {
              timestamp: Date.now() + delay2,
              delay: delay2
            },
            error: handleErrorResult.error
          };
        }
        return {
          status: "noop",
          error: handleErrorResult.error
        };
      }, {
        attributes: {
          [SemanticInternalAttributes.STYLE_ICON]: "exclamation-circle"
        }
      });
    }, "#handleError");
    __name(_TaskExecutor, "TaskExecutor");
    var TaskExecutor2 = _TaskExecutor;
    var _originClockTime;
    var originClockTime_get;
    var _originPreciseDate;
    var originPreciseDate_get;
    var _PreciseWallClock = class _PreciseWallClock {
      constructor(options = {}) {
        __privateAdd(this, _originClockTime);
        __privateAdd(this, _originPreciseDate);
        this._origin = {
          clockTime: options.origin ?? process.hrtime(),
          preciseDate: options.now ?? new preciseDate.PreciseDate()
        };
      }
      preciseNow() {
        const elapsedHrTime = process.hrtime(__privateGet(this, _originClockTime, originClockTime_get));
        const elapsedNanoseconds = BigInt(elapsedHrTime[0]) * BigInt(1e9) + BigInt(elapsedHrTime[1]);
        const preciseDate$1 = new preciseDate.PreciseDate(__privateGet(this, _originPreciseDate, originPreciseDate_get).getFullTime() + elapsedNanoseconds);
        const dateStruct = preciseDate$1.toStruct();
        return [
          dateStruct.seconds,
          dateStruct.nanos
        ];
      }
      reset() {
        this._origin = {
          clockTime: process.hrtime(),
          preciseDate: new preciseDate.PreciseDate()
        };
      }
    };
    _originClockTime = /* @__PURE__ */ new WeakSet();
    originClockTime_get = /* @__PURE__ */ __name(function() {
      return this._origin.clockTime;
    }, "#originClockTime");
    _originPreciseDate = /* @__PURE__ */ new WeakSet();
    originPreciseDate_get = /* @__PURE__ */ __name(function() {
      return this._origin.preciseDate;
    }, "#originPreciseDate");
    __name(_PreciseWallClock, "PreciseWallClock");
    var PreciseWallClock = _PreciseWallClock;
    function iconStringForSeverity(severityNumber) {
      switch (severityNumber) {
        case apiLogs.SeverityNumber.UNSPECIFIED:
          return void 0;
        case apiLogs.SeverityNumber.TRACE:
        case apiLogs.SeverityNumber.TRACE2:
        case apiLogs.SeverityNumber.TRACE3:
        case apiLogs.SeverityNumber.TRACE4:
          return "trace";
        case apiLogs.SeverityNumber.DEBUG:
        case apiLogs.SeverityNumber.DEBUG2:
        case apiLogs.SeverityNumber.DEBUG3:
        case apiLogs.SeverityNumber.DEBUG4:
          return "debug";
        case apiLogs.SeverityNumber.INFO:
        case apiLogs.SeverityNumber.INFO2:
        case apiLogs.SeverityNumber.INFO3:
        case apiLogs.SeverityNumber.INFO4:
          return "info";
        case apiLogs.SeverityNumber.WARN:
        case apiLogs.SeverityNumber.WARN2:
        case apiLogs.SeverityNumber.WARN3:
        case apiLogs.SeverityNumber.WARN4:
          return "warn";
        case apiLogs.SeverityNumber.ERROR:
        case apiLogs.SeverityNumber.ERROR2:
        case apiLogs.SeverityNumber.ERROR3:
        case apiLogs.SeverityNumber.ERROR4:
          return "error";
        case apiLogs.SeverityNumber.FATAL:
        case apiLogs.SeverityNumber.FATAL2:
        case apiLogs.SeverityNumber.FATAL3:
        case apiLogs.SeverityNumber.FATAL4:
          return "fatal";
      }
    }
    __name(iconStringForSeverity, "iconStringForSeverity");
    var _SimpleClock = class _SimpleClock {
      preciseNow() {
        const now = new preciseDate.PreciseDate();
        const nowStruct = now.toStruct();
        return [
          nowStruct.seconds,
          nowStruct.nanos
        ];
      }
      reset() {
      }
    };
    __name(_SimpleClock, "SimpleClock");
    var SimpleClock = _SimpleClock;
    var API_NAME3 = "clock";
    var SIMPLE_CLOCK = new SimpleClock();
    var _getClock;
    var getClock_fn;
    var _ClockAPI = class _ClockAPI2 {
      constructor() {
        __privateAdd(this, _getClock);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _ClockAPI2();
        }
        return this._instance;
      }
      setGlobalClock(clock22) {
        return registerGlobal(API_NAME3, clock22);
      }
      preciseNow() {
        return __privateMethod(this, _getClock, getClock_fn).call(this).preciseNow();
      }
      reset() {
        __privateMethod(this, _getClock, getClock_fn).call(this).reset();
      }
    };
    _getClock = /* @__PURE__ */ new WeakSet();
    getClock_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME3) ?? SIMPLE_CLOCK;
    }, "#getClock");
    __name(_ClockAPI, "ClockAPI");
    var ClockAPI = _ClockAPI;
    var clock2 = ClockAPI.getInstance();
    var logLevels2 = [
      "none",
      "error",
      "warn",
      "info",
      "debug"
    ];
    var _emitLog;
    var emitLog_fn;
    var _getTimestampInHrTime;
    var getTimestampInHrTime_fn;
    var _OtelTaskLogger = class _OtelTaskLogger {
      constructor(_config) {
        __privateAdd(this, _emitLog);
        __privateAdd(this, _getTimestampInHrTime);
        this._config = _config;
        this._level = logLevels2.indexOf(_config.level);
      }
      debug(message, properties) {
        if (this._level < 4)
          return;
        __privateMethod(this, _emitLog, emitLog_fn).call(this, message, __privateMethod(this, _getTimestampInHrTime, getTimestampInHrTime_fn).call(this), "debug", apiLogs.SeverityNumber.DEBUG, properties);
      }
      log(message, properties) {
        if (this._level < 3)
          return;
        __privateMethod(this, _emitLog, emitLog_fn).call(this, message, __privateMethod(this, _getTimestampInHrTime, getTimestampInHrTime_fn).call(this), "log", apiLogs.SeverityNumber.INFO, properties);
      }
      info(message, properties) {
        if (this._level < 3)
          return;
        __privateMethod(this, _emitLog, emitLog_fn).call(this, message, __privateMethod(this, _getTimestampInHrTime, getTimestampInHrTime_fn).call(this), "info", apiLogs.SeverityNumber.INFO, properties);
      }
      warn(message, properties) {
        if (this._level < 2)
          return;
        __privateMethod(this, _emitLog, emitLog_fn).call(this, message, __privateMethod(this, _getTimestampInHrTime, getTimestampInHrTime_fn).call(this), "warn", apiLogs.SeverityNumber.WARN, properties);
      }
      error(message, properties) {
        if (this._level < 1)
          return;
        __privateMethod(this, _emitLog, emitLog_fn).call(this, message, __privateMethod(this, _getTimestampInHrTime, getTimestampInHrTime_fn).call(this), "error", apiLogs.SeverityNumber.ERROR, properties);
      }
      trace(name, fn, options) {
        return this._config.tracer.startActiveSpan(name, fn, options);
      }
    };
    _emitLog = /* @__PURE__ */ new WeakSet();
    emitLog_fn = /* @__PURE__ */ __name(function(message, timestamp, severityText, severityNumber, properties) {
      let attributes = {
        ...flattenAttributes(safeJsonProcess(properties))
      };
      const icon = iconStringForSeverity(severityNumber);
      if (icon !== void 0) {
        attributes[SemanticInternalAttributes.STYLE_ICON] = icon;
      }
      this._config.logger.emit({
        severityNumber,
        severityText,
        body: message,
        attributes,
        timestamp
      });
    }, "#emitLog");
    _getTimestampInHrTime = /* @__PURE__ */ new WeakSet();
    getTimestampInHrTime_fn = /* @__PURE__ */ __name(function() {
      return clock2.preciseNow();
    }, "#getTimestampInHrTime");
    __name(_OtelTaskLogger, "OtelTaskLogger");
    var OtelTaskLogger2 = _OtelTaskLogger;
    function safeJsonProcess(value) {
      try {
        return JSON.parse(JSON.stringify(value, jsonErrorReplacer));
      } catch {
        return value;
      }
    }
    __name(safeJsonProcess, "safeJsonProcess");
    function jsonErrorReplacer(key, value) {
      if (value instanceof Error) {
        return {
          name: value.name,
          message: value.message,
          stack: value.stack
        };
      }
      return value;
    }
    __name(jsonErrorReplacer, "jsonErrorReplacer");
    var _handleLog;
    var handleLog_fn;
    var _getTimestampInHrTime2;
    var getTimestampInHrTime_fn2;
    var _getAttributes;
    var getAttributes_fn;
    var _ConsoleInterceptor = class _ConsoleInterceptor {
      constructor(logger2, sendToStdIO) {
        __privateAdd(this, _handleLog);
        __privateAdd(this, _getTimestampInHrTime2);
        __privateAdd(this, _getAttributes);
        this.logger = logger2;
        this.sendToStdIO = sendToStdIO;
      }
      // Intercept the console and send logs to the OpenTelemetry logger
      // during the execution of the callback
      async intercept(console2, callback) {
        const originalConsole = {
          log: console2.log,
          info: console2.info,
          warn: console2.warn,
          error: console2.error,
          debug: console2.debug
        };
        console2.log = this.log.bind(this);
        console2.info = this.info.bind(this);
        console2.warn = this.warn.bind(this);
        console2.error = this.error.bind(this);
        console2.debug = this.debug.bind(this);
        try {
          return await callback();
        } finally {
          console2.log = originalConsole.log;
          console2.info = originalConsole.info;
          console2.warn = originalConsole.warn;
          console2.error = originalConsole.error;
          console2.debug = originalConsole.debug;
        }
      }
      debug(...args) {
        __privateMethod(this, _handleLog, handleLog_fn).call(this, apiLogs.SeverityNumber.DEBUG, __privateMethod(this, _getTimestampInHrTime2, getTimestampInHrTime_fn2).call(this), "Debug", ...args);
      }
      log(...args) {
        __privateMethod(this, _handleLog, handleLog_fn).call(this, apiLogs.SeverityNumber.INFO, __privateMethod(this, _getTimestampInHrTime2, getTimestampInHrTime_fn2).call(this), "Log", ...args);
      }
      info(...args) {
        __privateMethod(this, _handleLog, handleLog_fn).call(this, apiLogs.SeverityNumber.INFO, __privateMethod(this, _getTimestampInHrTime2, getTimestampInHrTime_fn2).call(this), "Info", ...args);
      }
      warn(...args) {
        __privateMethod(this, _handleLog, handleLog_fn).call(this, apiLogs.SeverityNumber.WARN, __privateMethod(this, _getTimestampInHrTime2, getTimestampInHrTime_fn2).call(this), "Warn", ...args);
      }
      error(...args) {
        __privateMethod(this, _handleLog, handleLog_fn).call(this, apiLogs.SeverityNumber.ERROR, __privateMethod(this, _getTimestampInHrTime2, getTimestampInHrTime_fn2).call(this), "Error", ...args);
      }
    };
    _handleLog = /* @__PURE__ */ new WeakSet();
    handleLog_fn = /* @__PURE__ */ __name(function(severityNumber, timestamp, severityText, ...args) {
      const body = util__default.default.format(...args);
      if (this.sendToStdIO) {
        if (severityNumber === apiLogs.SeverityNumber.ERROR) {
          process.stderr.write(body);
        } else {
          process.stdout.write(body);
        }
      }
      const parsed = tryParseJSON(body);
      if (parsed.ok) {
        this.logger.emit({
          severityNumber,
          severityText,
          body: getLogMessage(parsed.value, severityText),
          attributes: {
            ...__privateMethod(this, _getAttributes, getAttributes_fn).call(this, severityNumber),
            ...flattenAttributes(parsed.value)
          },
          timestamp
        });
        return;
      }
      this.logger.emit({
        severityNumber,
        severityText,
        body,
        attributes: __privateMethod(this, _getAttributes, getAttributes_fn).call(this, severityNumber),
        timestamp
      });
    }, "#handleLog");
    _getTimestampInHrTime2 = /* @__PURE__ */ new WeakSet();
    getTimestampInHrTime_fn2 = /* @__PURE__ */ __name(function() {
      return clock2.preciseNow();
    }, "#getTimestampInHrTime");
    _getAttributes = /* @__PURE__ */ new WeakSet();
    getAttributes_fn = /* @__PURE__ */ __name(function(severityNumber1) {
      const icon = iconStringForSeverity(severityNumber1);
      let result = {};
      if (icon !== void 0) {
        result[SemanticInternalAttributes.STYLE_ICON] = icon;
      }
      return result;
    }, "#getAttributes");
    __name(_ConsoleInterceptor, "ConsoleInterceptor");
    var ConsoleInterceptor2 = _ConsoleInterceptor;
    function getLogMessage(value, fallback) {
      if (typeof value["message"] === "string") {
        return value["message"];
      }
      if (typeof value["msg"] === "string") {
        return value["msg"];
      }
      if (typeof value["body"] === "string") {
        return value["body"];
      }
      if (typeof value["error"] === "string") {
        return value["error"];
      }
      return fallback;
    }
    __name(getLogMessage, "getLogMessage");
    function tryParseJSON(value) {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          return {
            ok: true,
            value: parsed
          };
        }
        return {
          ok: false,
          value
        };
      } catch (e) {
        return {
          ok: false,
          value
        };
      }
    }
    __name(tryParseJSON, "tryParseJSON");
    var _StandardTaskCatalog = class _StandardTaskCatalog {
      constructor() {
        __publicField(this, "_taskMetadata", /* @__PURE__ */ new Map());
        __publicField(this, "_taskFunctions", /* @__PURE__ */ new Map());
        __publicField(this, "_taskFileMetadata", /* @__PURE__ */ new Map());
      }
      registerTaskMetadata(task) {
        const { fns, ...metadata } = task;
        this._taskMetadata.set(task.id, metadata);
        this._taskFunctions.set(task.id, fns);
      }
      updateTaskMetadata(id, updates) {
        const existingMetadata = this._taskMetadata.get(id);
        if (existingMetadata) {
          this._taskMetadata.set(id, {
            ...existingMetadata,
            ...updates
          });
        }
        if (updates.fns) {
          const existingFunctions = this._taskFunctions.get(id);
          if (existingFunctions) {
            this._taskFunctions.set(id, {
              ...existingFunctions,
              ...updates.fns
            });
          }
        }
      }
      registerTaskFileMetadata(id, metadata) {
        this._taskFileMetadata.set(id, metadata);
      }
      // Return all the tasks, without the functions
      getAllTaskMetadata() {
        const result = [];
        for (const [id, metadata] of this._taskMetadata) {
          const fileMetadata = this._taskFileMetadata.get(id);
          if (!fileMetadata) {
            continue;
          }
          result.push({
            ...metadata,
            ...fileMetadata
          });
        }
        return result;
      }
      getTaskMetadata(id) {
        const metadata = this._taskMetadata.get(id);
        const fileMetadata = this._taskFileMetadata.get(id);
        if (!metadata || !fileMetadata) {
          return void 0;
        }
        return {
          ...metadata,
          ...fileMetadata
        };
      }
      getTask(id) {
        const metadata = this._taskMetadata.get(id);
        const fileMetadata = this._taskFileMetadata.get(id);
        const fns = this._taskFunctions.get(id);
        if (!metadata || !fns || !fileMetadata) {
          return void 0;
        }
        return {
          ...metadata,
          ...fileMetadata,
          fns
        };
      }
      taskExists(id) {
        return this._taskMetadata.has(id);
      }
      disable() {
      }
    };
    __name(_StandardTaskCatalog, "StandardTaskCatalog");
    var StandardTaskCatalog2 = _StandardTaskCatalog;
    var _NoopUsageManager = class _NoopUsageManager {
      disable() {
      }
      start() {
        return {
          sample: () => ({
            cpuTime: 0,
            wallTime: 0
          })
        };
      }
      stop(measurement) {
        return measurement.sample();
      }
      pauseAsync(cb) {
        return cb();
      }
      sample() {
        return void 0;
      }
    };
    __name(_NoopUsageManager, "NoopUsageManager");
    var NoopUsageManager = _NoopUsageManager;
    var API_NAME4 = "usage";
    var NOOP_USAGE_MANAGER = new NoopUsageManager();
    var _getUsageManager;
    var getUsageManager_fn;
    var _UsageAPI = class _UsageAPI2 {
      constructor() {
        __privateAdd(this, _getUsageManager);
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _UsageAPI2();
        }
        return this._instance;
      }
      setGlobalUsageManager(manager) {
        return registerGlobal(API_NAME4, manager);
      }
      disable() {
        __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).disable();
        unregisterGlobal(API_NAME4);
      }
      start() {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).start();
      }
      stop(measurement) {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).stop(measurement);
      }
      pauseAsync(cb) {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).pauseAsync(cb);
      }
      sample() {
        return __privateMethod(this, _getUsageManager, getUsageManager_fn).call(this).sample();
      }
    };
    _getUsageManager = /* @__PURE__ */ new WeakSet();
    getUsageManager_fn = /* @__PURE__ */ __name(function() {
      return getGlobal(API_NAME4) ?? NOOP_USAGE_MANAGER;
    }, "#getUsageManager");
    __name(_UsageAPI, "UsageAPI");
    var UsageAPI = _UsageAPI;
    var usage2 = UsageAPI.getInstance();
    function calculateDurationInMs(start, end) {
      const [startSeconds, startNanoseconds] = start;
      const [endSeconds, endNanoseconds] = end;
      const seconds = endSeconds - startSeconds;
      const nanoseconds = endNanoseconds - startNanoseconds;
      return Math.floor(seconds * 1e3 + nanoseconds / 1e6);
    }
    __name(calculateDurationInMs, "calculateDurationInMs");
    var _a2;
    var DevUsageMeasurement = (_a2 = class {
      constructor(id, startedAt = clock2.preciseNow()) {
        this.id = id;
        this.startedAt = startedAt;
        this._pauses = /* @__PURE__ */ new Map();
      }
      stop() {
        this._endedAt = clock2.preciseNow();
      }
      sample() {
        const endedAt = this._endedAt ?? clock2.preciseNow();
        const wallTime = this.startedAt ? calculateDurationInMs(this.startedAt, endedAt) : 0;
        if (wallTime === 0) {
          return {
            cpuTime: 0,
            wallTime: 0
          };
        }
        const totalPauses = Array.from(this._pauses.values()).reduce((total, pause) => {
          return total + calculateDurationInMs(pause.start, pause.end ?? endedAt);
        }, 0);
        const cpuTime = wallTime - totalPauses;
        return {
          wallTime,
          cpuTime
        };
      }
      registerPause(pauseId, start, end) {
        this._pauses.set(pauseId, {
          start,
          end
        });
      }
    }, __name(_a2, "DevUsageMeasurement"), _a2);
    var _DevUsageManager = class _DevUsageManager {
      constructor() {
        __publicField(this, "_currentMeasurements", /* @__PURE__ */ new Map());
        __publicField(this, "_pauses", /* @__PURE__ */ new Map());
      }
      disable() {
      }
      sample() {
        return this._firstMeasurement?.sample();
      }
      start() {
        const id = generateRandomString();
        const measurement = new DevUsageMeasurement(id);
        if (!this._firstMeasurement) {
          this._firstMeasurement = measurement;
        }
        this._currentMeasurements.set(id, measurement);
        return measurement;
      }
      stop(measurement) {
        measurement.stop();
        const sample = measurement.sample();
        this._currentMeasurements.delete(measurement.id);
        return sample;
      }
      async pauseAsync(cb) {
        const pauseId = generateRandomString();
        const pauseStart = clock2.preciseNow();
        try {
          this._pauses.set(pauseId, {
            start: pauseStart
          });
          for (const measurement of this._currentMeasurements.values()) {
            measurement.registerPause(pauseId, pauseStart);
          }
          return await cb();
        } finally {
          const pauseEnd = clock2.preciseNow();
          this._pauses.set(pauseId, {
            start: pauseStart,
            end: pauseEnd
          });
          for (const measurement of this._currentMeasurements.values()) {
            measurement.registerPause(pauseId, pauseStart, pauseEnd);
          }
        }
      }
    };
    __name(_DevUsageManager, "DevUsageManager");
    var DevUsageManager2 = _DevUsageManager;
    function generateRandomString() {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (var i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    __name(generateRandomString, "generateRandomString");
    var _UsageClient = class _UsageClient {
      constructor(url, jwt) {
        this.url = url;
        this.jwt = jwt;
      }
      async sendUsageEvent(event) {
        try {
          const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
              "content-type": "application/json",
              "x-trigger-jwt": this.jwt,
              accept: "application/json",
              authorization: `Bearer ${apiClientManager.accessToken}`
            }
          });
          if (response.ok) {
            const renewedJwt = response.headers.get("x-trigger-jwt");
            if (renewedJwt) {
              this.jwt = renewedJwt;
            }
          }
        } catch (error) {
          console.error(`Failed to send usage event: ${error}`);
        }
      }
    };
    __name(_UsageClient, "UsageClient");
    var UsageClient = _UsageClient;
    var _startReportingHeartbeat;
    var startReportingHeartbeat_fn;
    var _reportUsage;
    var reportUsage_fn;
    var _ProdUsageManager = class _ProdUsageManager {
      constructor(delegageUsageManager, options) {
        __privateAdd(this, _startReportingHeartbeat);
        __privateAdd(this, _reportUsage);
        this.delegageUsageManager = delegageUsageManager;
        this.options = options;
        if (this.options.url && this.options.jwt) {
          this._usageClient = new UsageClient(this.options.url, this.options.jwt);
        }
      }
      get isReportingEnabled() {
        return typeof this._usageClient !== "undefined";
      }
      disable() {
        this.delegageUsageManager.disable();
        this._abortController?.abort();
      }
      sample() {
        return this._measurement?.sample();
      }
      start() {
        if (!this.isReportingEnabled || !this.options.heartbeatIntervalMs) {
          return this.delegageUsageManager.start();
        }
        if (!this._measurement) {
          this._measurement = this.delegageUsageManager.start();
          __privateMethod(this, _startReportingHeartbeat, startReportingHeartbeat_fn).call(this).catch(console.error);
          return this._measurement;
        }
        return this.delegageUsageManager.start();
      }
      stop(measurement) {
        return this.delegageUsageManager.stop(measurement);
      }
      async pauseAsync(cb) {
        return this.delegageUsageManager.pauseAsync(cb);
      }
      async flush() {
        return await __privateMethod(this, _reportUsage, reportUsage_fn).call(this);
      }
    };
    _startReportingHeartbeat = /* @__PURE__ */ new WeakSet();
    startReportingHeartbeat_fn = /* @__PURE__ */ __name(async function() {
      if (!this._measurement || !this.isReportingEnabled || !this.options.heartbeatIntervalMs) {
        return;
      }
      this._abortController = new AbortController();
      for await (const _ of promises.setInterval(this.options.heartbeatIntervalMs)) {
        if (this._abortController.signal.aborted) {
          break;
        }
        await __privateMethod(this, _reportUsage, reportUsage_fn).call(this);
      }
    }, "#startReportingHeartbeat");
    _reportUsage = /* @__PURE__ */ new WeakSet();
    reportUsage_fn = /* @__PURE__ */ __name(async function() {
      if (!this._measurement) {
        return;
      }
      if (!this.isReportingEnabled) {
        return;
      }
      const client = this._usageClient;
      if (!client) {
        return;
      }
      const sample = this._measurement.sample();
      const cpuTimeSinceLastSample = this._lastSample ? sample.cpuTime - this._lastSample.cpuTime : sample.cpuTime;
      this._lastSample = sample;
      if (cpuTimeSinceLastSample <= 0) {
        return;
      }
      await client.sendUsageEvent({
        durationMs: cpuTimeSinceLastSample
      });
    }, "#reportUsage");
    __name(_ProdUsageManager, "ProdUsageManager");
    var ProdUsageManager = _ProdUsageManager;
    exports2.ConsoleInterceptor = ConsoleInterceptor2;
    exports2.DevUsageManager = DevUsageManager2;
    exports2.DurableClock = PreciseWallClock;
    exports2.OtelTaskLogger = OtelTaskLogger2;
    exports2.ProdUsageManager = ProdUsageManager;
    exports2.StandardTaskCatalog = StandardTaskCatalog2;
    exports2.TaskContextLogProcessor = TaskContextLogProcessor;
    exports2.TaskContextSpanProcessor = TaskContextSpanProcessor;
    exports2.TaskExecutor = TaskExecutor2;
    exports2.TracingSDK = TracingSDK2;
    exports2.getEnvVar = getEnvVar2;
    exports2.logLevels = logLevels2;
    exports2.recordSpanException = recordSpanException;
    exports2.usage = usage2;
  }
});

// ../../node_modules/@trigger.dev/core/dist/v3/dev/index.js
var require_dev = __commonJS({
  "../../node_modules/@trigger.dev/core/dist/v3/dev/index.js"(exports2) {
    "use strict";
    init_define_PROJECT_CONFIG();
    var promises = require("timers/promises");
    var __defProp2 = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    async function unboundedTimeout(delay = 0, value, options) {
      const maxDelay = 2147483647;
      const fullTimeouts = Math.floor(delay / maxDelay);
      const remainingDelay = delay % maxDelay;
      let lastTimeoutResult = await promises.setTimeout(remainingDelay, value, options);
      for (let i = 0; i < fullTimeouts; i++) {
        lastTimeoutResult = await promises.setTimeout(maxDelay, value, options);
      }
      return lastTimeoutResult;
    }
    __name(unboundedTimeout, "unboundedTimeout");
    var _DevRuntimeManager = class _DevRuntimeManager {
      constructor() {
        __publicField(this, "_taskWaits", /* @__PURE__ */ new Map());
        __publicField(this, "_batchWaits", /* @__PURE__ */ new Map());
        __publicField(this, "_pendingCompletionNotifications", /* @__PURE__ */ new Map());
      }
      disable() {
      }
      async waitForDuration(ms) {
        await unboundedTimeout(ms);
      }
      async waitUntil(date) {
        return this.waitForDuration(date.getTime() - Date.now());
      }
      async waitForTask(params) {
        const pendingCompletion = this._pendingCompletionNotifications.get(params.id);
        if (pendingCompletion) {
          this._pendingCompletionNotifications.delete(params.id);
          return pendingCompletion;
        }
        const promise = new Promise((resolve) => {
          this._taskWaits.set(params.id, {
            resolve
          });
        });
        return await promise;
      }
      async waitForBatch(params) {
        if (!params.runs.length) {
          return Promise.resolve({
            id: params.id,
            items: []
          });
        }
        const promise = Promise.all(params.runs.map((runId) => {
          return new Promise((resolve, reject) => {
            const pendingCompletion = this._pendingCompletionNotifications.get(runId);
            if (pendingCompletion) {
              this._pendingCompletionNotifications.delete(runId);
              resolve(pendingCompletion);
              return;
            }
            this._taskWaits.set(runId, {
              resolve
            });
          });
        }));
        const results = await promise;
        return {
          id: params.id,
          items: results
        };
      }
      resumeTask(completion, runId) {
        const wait = this._taskWaits.get(runId);
        if (!wait) {
          this._pendingCompletionNotifications.set(runId, completion);
          return;
        }
        wait.resolve(completion);
        this._taskWaits.delete(runId);
      }
    };
    __name(_DevRuntimeManager, "DevRuntimeManager");
    var DevRuntimeManager2 = _DevRuntimeManager;
    exports2.DevRuntimeManager = DevRuntimeManager2;
  }
});

// ../../node_modules/@trigger.dev/core/dist/v3/zodMessageHandler.js
var require_zodMessageHandler = __commonJS({
  "../../node_modules/@trigger.dev/core/dist/v3/zodMessageHandler.js"(exports2) {
    "use strict";
    init_define_PROJECT_CONFIG();
    var zod = require("zod");
    var __defProp2 = Object.defineProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __accessCheck = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    var __privateGet = (obj, member, getter) => {
      __accessCheck(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    var __privateAdd = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    var __privateSet = (obj, member, value, setter) => {
      __accessCheck(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    var _ZodSchemaParsedError = class _ZodSchemaParsedError extends Error {
      constructor(error, payload) {
        super(error.message);
        this.error = error;
        this.payload = payload;
      }
    };
    __name(_ZodSchemaParsedError, "ZodSchemaParsedError");
    var ZodSchemaParsedError2 = _ZodSchemaParsedError;
    var ZodMessageSchema = zod.z.object({
      version: zod.z.literal("v1").default("v1"),
      type: zod.z.string(),
      payload: zod.z.unknown()
    });
    var _schema;
    var _handlers;
    var _logger;
    var _ZodMessageHandler = class _ZodMessageHandler {
      constructor(options) {
        __privateAdd(this, _schema, void 0);
        __privateAdd(this, _handlers, void 0);
        __privateAdd(this, _logger, void 0);
        __privateSet(this, _schema, options.schema);
        __privateSet(this, _handlers, options.messages);
        __privateSet(this, _logger, options.logger ?? console);
      }
      async handleMessage(message) {
        const parsedMessage = this.parseMessage(message);
        if (!parsedMessage.success) {
          __privateGet(this, _logger).error(parsedMessage.error, {
            message
          });
          return {
            success: false,
            error: parsedMessage.error
          };
        }
        if (!__privateGet(this, _handlers)) {
          __privateGet(this, _logger).error("No handlers provided", {
            message
          });
          return {
            success: false,
            error: "No handlers provided"
          };
        }
        const handler2 = __privateGet(this, _handlers)[parsedMessage.data.type];
        if (!handler2) {
          const error = `No handler for message type: ${String(parsedMessage.data.type)}`;
          __privateGet(this, _logger).error(error, {
            message
          });
          return {
            success: false,
            error
          };
        }
        const ack = await handler2(parsedMessage.data.payload);
        return {
          success: true,
          data: ack
        };
      }
      parseMessage(message) {
        const parsedMessage = ZodMessageSchema.safeParse(message);
        if (!parsedMessage.success) {
          return {
            success: false,
            error: `Failed to parse message: ${JSON.stringify(parsedMessage.error)}`
          };
        }
        const schema = __privateGet(this, _schema)[parsedMessage.data.type];
        if (!schema) {
          return {
            success: false,
            error: `Unknown message type: ${parsedMessage.data.type}`
          };
        }
        const parsedPayload = schema.safeParse(parsedMessage.data.payload);
        if (!parsedPayload.success) {
          return {
            success: false,
            error: `Failed to parse message payload: ${JSON.stringify(parsedPayload.error)}`
          };
        }
        return {
          success: true,
          data: {
            type: parsedMessage.data.type,
            payload: parsedPayload.data
          }
        };
      }
      registerHandlers(emitter, logger2) {
        const log = logger2 ?? console;
        if (!__privateGet(this, _handlers)) {
          log.info("No handlers provided");
          return;
        }
        for (const eventName of Object.keys(__privateGet(this, _schema))) {
          emitter.on(eventName, async (message, callback) => {
            log.info(`handling ${eventName}`, {
              payload: message,
              hasCallback: !!callback
            });
            let ack;
            if ("payload" in message) {
              ack = await this.handleMessage({
                type: eventName,
                ...message
              });
            } else {
              const { version: version2, ...payload } = message;
              ack = await this.handleMessage({
                type: eventName,
                version: version2,
                payload
              });
            }
            if (callback && typeof callback === "function") {
              if (!ack.success) {
                log.error("Failed to handle message, skipping callback", {
                  message,
                  error: ack.error
                });
                return;
              }
              callback(ack.data);
            }
          });
        }
      }
    };
    _schema = /* @__PURE__ */ new WeakMap();
    _handlers = /* @__PURE__ */ new WeakMap();
    _logger = /* @__PURE__ */ new WeakMap();
    __name(_ZodMessageHandler, "ZodMessageHandler");
    var ZodMessageHandler2 = _ZodMessageHandler;
    var _schema2;
    var _sender;
    var _ZodMessageSender = class _ZodMessageSender {
      constructor(options) {
        __privateAdd(this, _schema2, void 0);
        __privateAdd(this, _sender, void 0);
        __privateSet(this, _schema2, options.schema);
        __privateSet(this, _sender, options.sender);
      }
      async send(type, payload) {
        const schema = __privateGet(this, _schema2)[type];
        if (!schema) {
          throw new Error(`Unknown message type: ${type}`);
        }
        const parsedPayload = schema.safeParse(payload);
        if (!parsedPayload.success) {
          throw new ZodSchemaParsedError2(parsedPayload.error, payload);
        }
        try {
          await __privateGet(this, _sender).call(this, {
            type,
            payload,
            version: "v1"
          });
        } catch (error) {
          console.error("[ZodMessageSender] Failed to send message", error);
        }
      }
      async forwardMessage(message) {
        const parsedMessage = ZodMessageSchema.safeParse(message);
        if (!parsedMessage.success) {
          throw new Error(`Failed to parse message: ${JSON.stringify(parsedMessage.error)}`);
        }
        const schema = __privateGet(this, _schema2)[parsedMessage.data.type];
        if (!schema) {
          throw new Error(`Unknown message type: ${parsedMessage.data.type}`);
        }
        const parsedPayload = schema.safeParse(parsedMessage.data.payload);
        if (!parsedPayload.success) {
          throw new Error(`Failed to parse message payload: ${JSON.stringify(parsedPayload.error)}`);
        }
        try {
          await __privateGet(this, _sender).call(this, {
            type: parsedMessage.data.type,
            payload: parsedPayload.data,
            version: "v1"
          });
        } catch (error) {
          console.error("[ZodMessageSender] Failed to forward message", error);
        }
      }
    };
    _schema2 = /* @__PURE__ */ new WeakMap();
    _sender = /* @__PURE__ */ new WeakMap();
    __name(_ZodMessageSender, "ZodMessageSender");
    var ZodMessageSender2 = _ZodMessageSender;
    exports2.ZodMessageHandler = ZodMessageHandler2;
    exports2.ZodMessageSchema = ZodMessageSchema;
    exports2.ZodMessageSender = ZodMessageSender2;
    exports2.ZodSchemaParsedError = ZodSchemaParsedError2;
  }
});

// __entryPoint.ts
init_define_PROJECT_CONFIG();
var import_v32 = __toESM(require_v3());
var import_workers2 = __toESM(require_workers());
var import_v33 = __toESM(require_v3());
var import_dev = __toESM(require_dev());
var import_zodMessageHandler2 = __toESM(require_zodMessageHandler());

// ../../../../../../../private/tmp/bunx-501-trigger.dev@beta/node_modules/trigger.dev/dist/workers/dev/worker-setup.js
init_define_PROJECT_CONFIG();
var import_v3 = __toESM(require_v3(), 1);
var import_workers = __toESM(require_workers(), 1);
var import_zodMessageHandler = __toESM(require_zodMessageHandler(), 1);
var import_register = require("source-map-support/register.js");

// trigger.config.ts
init_define_PROJECT_CONFIG();
var config = {
  project: "proj_wlvanvtxvnxlxewmqfbh",
  logLevel: "log",
  tsconfigPath: "tsconfig.json",
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 1e4,
      factor: 2,
      randomize: true
    }
  }
};

// ../../../../../../../private/tmp/bunx-501-trigger.dev@beta/node_modules/trigger.dev/dist/workers/dev/worker-setup.js
var version = "3.0.0-beta.56";
var setupImportedConfig = config;
var tracingSDK = new import_workers.TracingSDK({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://0.0.0.0:4318",
  instrumentations: setupImportedConfig?.instrumentations ?? [],
  diagLogLevel: process.env.OTEL_LOG_LEVEL ?? "none",
  forceFlushTimeoutMillis: 5e3
});
var otelTracer = tracingSDK.getTracer("trigger-dev-worker", version);
var otelLogger = tracingSDK.getLogger("trigger-dev-worker", version);
var sender = new import_zodMessageHandler.ZodMessageSender({
  schema: import_v3.childToWorkerMessages,
  sender: async (message) => {
    process.send?.(message);
  }
});
import_v3.taskCatalog.setGlobalTaskCatalog(new import_workers.StandardTaskCatalog());

// __entryPoint.ts
var importedConfig = config;
var handleError2 = void 0;
var durableClock = new import_workers2.DurableClock();
import_v32.clock.setGlobalClock(durableClock);
import_workers2.usage.setGlobalUsageManager(new import_workers2.DevUsageManager());
var tracer = new import_v33.TriggerTracer({ tracer: otelTracer, logger: otelLogger });
var consoleInterceptor = new import_workers2.ConsoleInterceptor(
  otelLogger,
  typeof define_PROJECT_CONFIG_default.enableConsoleLogging === "boolean" ? define_PROJECT_CONFIG_default.enableConsoleLogging : true
);
var devRuntimeManager = new import_dev.DevRuntimeManager();
import_v33.runtime.setGlobalRuntimeManager(devRuntimeManager);
var triggerLogLevel = (0, import_workers2.getEnvVar)("TRIGGER_LOG_LEVEL");
var configLogLevel = triggerLogLevel ? triggerLogLevel : importedConfig ? importedConfig.logLevel : define_PROJECT_CONFIG_default.logLevel;
var otelTaskLogger = new import_workers2.OtelTaskLogger({
  logger: otelLogger,
  tracer,
  level: import_workers2.logLevels.includes(configLogLevel) ? configLogLevel : "info"
});
import_v33.logger.setGlobalTaskLogger(otelTaskLogger);
var TaskFileImports = {};
var TaskFiles = {};
(() => {
  for (const [importName, taskFile] of Object.entries(TaskFiles)) {
    const fileImports = TaskFileImports[importName];
    for (const [exportName, task] of Object.entries(fileImports ?? {})) {
      if (typeof task === "object" && task !== null && "id" in task && typeof task.id === "string") {
        if (import_v32.taskCatalog.taskExists(task.id)) {
          import_v32.taskCatalog.registerTaskFileMetadata(task.id, {
            exportName,
            filePath: taskFile.filePath
          });
        }
      }
    }
  }
})();
var _execution;
var _isRunning = false;
var handler = new import_zodMessageHandler2.ZodMessageHandler({
  schema: import_v33.workerToChildMessages,
  messages: {
    EXECUTE_TASK_RUN: async ({ execution, traceContext, metadata }) => {
      if (_isRunning) {
        console.error("Worker is already running a task");
        await sender.send("TASK_RUN_COMPLETED", {
          execution,
          result: {
            ok: false,
            id: execution.run.id,
            error: {
              type: "INTERNAL_ERROR",
              code: import_v33.TaskRunErrorCodes.TASK_ALREADY_RUNNING
            },
            usage: {
              durationMs: 0
            }
          }
        });
        return;
      }
      process.title = `trigger-dev-worker: ${execution.task.id} ${execution.run.id}`;
      const task = import_v32.taskCatalog.getTask(execution.task.id);
      if (!task) {
        console.error(`Could not find task ${execution.task.id}`);
        await sender.send("TASK_RUN_COMPLETED", {
          execution,
          result: {
            ok: false,
            id: execution.run.id,
            error: {
              type: "INTERNAL_ERROR",
              code: import_v33.TaskRunErrorCodes.COULD_NOT_FIND_EXECUTOR
            },
            usage: {
              durationMs: 0
            }
          }
        });
        return;
      }
      const executor = new import_workers2.TaskExecutor(task, {
        tracer,
        tracingSDK,
        consoleInterceptor,
        projectConfig: define_PROJECT_CONFIG_default,
        importedConfig,
        handleErrorFn: handleError2
      });
      try {
        _execution = execution;
        _isRunning = true;
        const measurement = import_workers2.usage.start();
        const { result } = await executor.execute(execution, metadata, traceContext, measurement);
        const usageSample = import_workers2.usage.stop(measurement);
        return sender.send("TASK_RUN_COMPLETED", {
          execution,
          result: {
            ...result,
            usage: {
              durationMs: usageSample.cpuTime
            }
          }
        });
      } finally {
        _execution = void 0;
        _isRunning = false;
      }
    },
    TASK_RUN_COMPLETED_NOTIFICATION: async (payload) => {
      switch (payload.version) {
        case "v1": {
          devRuntimeManager.resumeTask(payload.completion, payload.execution.run.id);
          break;
        }
        case "v2": {
          devRuntimeManager.resumeTask(payload.completion, payload.completion.id);
          break;
        }
      }
    },
    CLEANUP: async ({ flush, kill }) => {
      if (kill) {
        await tracingSDK.flush();
        await sender.send("READY_TO_DISPOSE", void 0);
      } else {
        if (flush) {
          await tracingSDK.flush();
        }
      }
    }
  }
});
process.on("message", async (msg) => {
  await handler.handleMessage(msg);
});
var TASK_METADATA = import_v32.taskCatalog.getAllTaskMetadata();
sender.send("TASKS_READY", { tasks: TASK_METADATA }).catch((err) => {
  if (err instanceof import_zodMessageHandler2.ZodSchemaParsedError) {
    sender.send("TASKS_FAILED_TO_PARSE", { zodIssues: err.error.issues, tasks: TASK_METADATA });
  } else {
    console.error("Failed to send TASKS_READY message", err);
  }
});
process.title = "trigger-dev-worker";
async function asyncHeartbeat(initialDelayInSeconds = 30, intervalInSeconds = 30) {
  async function _doHeartbeat() {
    while (true) {
      if (_isRunning && _execution) {
        try {
          await sender.send("TASK_HEARTBEAT", { id: _execution.attempt.id });
        } catch (err) {
          console.error("Failed to send HEARTBEAT message", err);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3 * intervalInSeconds));
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1e3 * initialDelayInSeconds));
  return _doHeartbeat();
}
asyncHeartbeat().catch((err) => {
  console.error("Failed to start asyncHeartbeat", err);
});

//# sourceMappingURL=887a5e315df1e6ece066de24016b31b6.js.map