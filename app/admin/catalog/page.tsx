"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { CatalogItemRecord, CatalogStatus } from "@/lib/catalog/types";

const STATUSES: CatalogStatus[] = ["candidate", "approved", "deprecated"];

export default function CatalogAdminPage() {
  const [adminToken, setAdminToken] = useState("");
  const [status, setStatus] = useState<CatalogStatus>("candidate");
  const [items, setItems] = useState<CatalogItemRecord[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const statusTitle = useMemo(() => `Catalog status: ${status}`, [status]);

  const loadItems = useCallback(async (selectedStatus = status) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/catalog/items?status=${selectedStatus}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as {
        count: number;
        warning?: string;
        items: CatalogItemRecord[];
      };
      setItems(data.items || []);
      if (data.warning) {
        setMessage(data.warning);
      }
    } catch {
      setMessage("Could not load catalog items.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadItems(status).catch(() => undefined);
  }, [loadItems, status]);

  const runSync = async () => {
    if (!adminToken) {
      setMessage("Admin token is required.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/catalog/sync", {
        method: "POST",
        headers: {
          "x-admin-token": adminToken,
        },
      });
      const data = (await response.json()) as {
        inserted?: number;
        updated?: number;
        deprecated?: number;
        warning?: string;
        error?: string;
      };

      if (!response.ok) {
        setMessage(data.error || "Sync failed.");
        return;
      }

      setMessage(
        `Sync completed. inserted=${data.inserted ?? 0}, updated=${data.updated ?? 0}, deprecated=${
          data.deprecated ?? 0
        }${data.warning ? ` | warning: ${data.warning}` : ""}`,
      );
      await loadItems(status);
    } catch {
      setMessage("Sync request failed.");
    } finally {
      setLoading(false);
    }
  };

  const review = async (itemId: string, action: "approve" | "deprecate" | "reject") => {
    if (!adminToken) {
      setMessage("Admin token is required.");
      return;
    }

    try {
      const response = await fetch("/api/catalog/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": adminToken,
        },
        body: JSON.stringify({ id: itemId, action, notes: "Admin review action" }),
      });

      const data = (await response.json()) as { error?: string; warning?: string };
      if (!response.ok) {
        setMessage(data.error || "Review failed.");
        return;
      }

      setMessage(`Item ${itemId} marked as ${action}.${data.warning ? ` ${data.warning}` : ""}`);
      await loadItems(status);
    } catch {
      setMessage("Review request failed.");
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-edge bg-panel p-6">
        <h1 className="text-2xl font-bold">Catalog Admin</h1>
        <p className="mt-2 text-sm text-muted">
          Candidate/approved/deprecated lifecycle with deterministic sync and review flow.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="CATALOG_ADMIN_TOKEN"
            className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-text"
          />
          <button
            onClick={() => loadItems(status)}
            className="rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-semibold"
          >
            Refresh
          </button>
          <button
            onClick={runSync}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface"
          >
            Run Sync
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {STATUSES.map((option) => (
            <button
              key={option}
              onClick={() => setStatus(option)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                status === option
                  ? "border-accent bg-accent text-surface"
                  : "border-edge bg-surface text-text"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted">{statusTitle}</p>
        {message ? <p className="mt-2 text-sm text-muted">{message}</p> : null}
      </section>

      <section className="mt-6 grid gap-3">
        {loading ? <p className="text-sm text-muted">Loading...</p> : null}
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-edge bg-panel p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold">{item.componentName}</h2>
              <span className="text-sm text-muted">{item.source}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {item.libraryName} · {item.category} · score {item.qualityScore}
            </p>
            <p className="mt-2 text-sm text-muted">{item.url}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => review(item.id, "approve")}
                className="rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm font-semibold"
              >
                Approve
              </button>
              <button
                onClick={() => review(item.id, "deprecate")}
                className="rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm font-semibold"
              >
                Deprecate
              </button>
              <button
                onClick={() => review(item.id, "reject")}
                className="rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm font-semibold"
              >
                Reject
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
