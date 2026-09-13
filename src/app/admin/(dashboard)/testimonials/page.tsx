import { getAdminTestimonials } from "@/lib/data/admin";
import { setTestimonialStatus, deleteTestimonial } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const dbConnected = Boolean(getDb());
  const testimonials = await getAdminTestimonials();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Testimonials</h1>
        <p className="mt-1 text-sm text-ink-500">
          Approve testimonies before they appear publicly, or remove unwanted ones.
        </p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="flex flex-col gap-4 rounded-2xl border border-brand-950/[0.06] bg-white p-5 shadow-soft sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink-800">{testimonial.name}</p>
                {testimonial.isApproved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] font-bold text-emerald-700">
                    <Icon name="check" className="h-3 w-3" />
                    Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2 py-0.5 text-[0.7rem] font-bold text-gold-800">
                    <Icon name="clock" className="h-3 w-3" />
                    Pending
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">“{testimonial.message}”</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!testimonial.isApproved ? (
                <form action={setTestimonialStatus} className="inline-flex">
                  <input type="hidden" name="id" value={testimonial.id} />
                  <input type="hidden" name="status" value="approve" />
                  <EntitySubmitButton
                    disabled={!dbConnected}
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                  >
                    <Icon name="check" className="h-3.5 w-3.5" />
                    Approve
                  </EntitySubmitButton>
                </form>
              ) : (
                <form action={setTestimonialStatus} className="inline-flex">
                  <input type="hidden" name="id" value={testimonial.id} />
                  <input type="hidden" name="status" value="reject" />
                  <EntitySubmitButton
                    disabled={!dbConnected}
                    className="bg-gold-50 text-gold-800 hover:bg-gold-100 disabled:opacity-50"
                  >
                    <Icon name="close" className="h-3.5 w-3.5" />
                    Unapprove
                  </EntitySubmitButton>
                </form>
              )}
              <form action={deleteTestimonial} className="inline-flex">
                <input type="hidden" name="id" value={testimonial.id} />
                <EntitySubmitButton
                  disabled={!dbConnected}
                  className="bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  <Icon name="trash" className="h-3.5 w-3.5" />
                  Delete
                </EntitySubmitButton>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}