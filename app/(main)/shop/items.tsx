"use client";

import Image from "next/image";
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { createStripeUrl } from "@/actions/user-subscription";

const POINTS_TO_REFILL_HEARTS = 10;

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Failed to refill hearts"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
      .then((res) => {
        if (res.data) {
          window.location.href = res.data;
        }
      })
      .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"heart.svg"} alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          disabled={hearts === 5 || points < POINTS_TO_REFILL_HEARTS || pending}
          onClick={onRefillHearts}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src={"points.svg"} alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL_HEARTS}</p>
            </div>
          )}
        </Button>
      </div>

      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src={"unlimited.svg"} alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button
          disabled={pending}
          onClick={onUpgrade}
        >
          {hasActiveSubscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </ul>
  );
};
