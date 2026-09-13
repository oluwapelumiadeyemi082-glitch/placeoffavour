import { getAdminGalleryAlbums, getAdminGalleryImages } from "@/lib/data/admin";
import { saveAlbum, deleteAlbum } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntityForm, EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  const dbConnected = Boolean(getDb());
  const albums = await getAdminGalleryAlbums();
  const images = await getAdminGalleryImages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Gallery</h1>
        <p className="mt-1 text-sm text-ink-500">Albums and photos shown on /gallery.</p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-6">
          {albums.map((album) => {
            const albumImages = images.filter((img) => img.albumSlug === album.slug);
            return (
              <div
                key={album.id}
                className="overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft"
              >
                <div className="flex items-center justify-between gap-4 border-b border-brand-950/[0.06] px-5 py-4">
                  <div>
                    <p className="font-semibold text-ink-800">{album.name}</p>
                    <p className="text-xs text-ink-400">
                      {albumImages.length} photo{albumImages.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <form action={deleteAlbum}>
                    <input type="hidden" name="id" value={album.id} />
                    <EntitySubmitButton
                      disabled={!dbConnected}
                      className="bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      <Icon name="close" className="h-3.5 w-3.5" />
                      Delete
                    </EntitySubmitButton>
                  </form>
                </div>
                <div className="grid grid-cols-2 gap-px bg-brand-950/[0.06] sm:grid-cols-4">
                  {(albumImages.length > 0 ? albumImages : [{ id: album.id, src: album.cover, albumSlug: album.slug, alt: album.name }]).map(
                    (img) => (
                      <div key={img.id} className="bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} className="aspect-square w-full object-cover" />
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <section className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl font-medium text-brand-950">Add an album</h2>
          <p className="mt-1 text-sm text-ink-500">
            Photos are added per album in a later phase (file upload). Cover image can be any URL.
          </p>
          <div className="mt-4">
            <EntityForm
              action={saveAlbum}
              dbConnected={dbConnected}
              submitLabel={dbConnected ? "Add album" : "Add album (unavailable)"}
              fields={[
                { name: "name", label: "Name", type: "text" },
                { name: "description", label: "Description", type: "textarea", rows: 2 },
                { name: "cover", label: "Cover image URL", type: "url" },
                { name: "order", label: "Order", type: "number", value: 0 },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}