import { motion } from "framer-motion";
import catIcon from "@/assets/cat.png";

export function LoadingScreen() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-background px-6">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
        className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg"
      >
        <img
          src={catIcon}
          alt="Cat logo"
          className="w-14 h-14 object-contain pl-2"
        />
      </motion.div>

      <h1 className="text-4xl font-semibold text-foreground mb-2">
        PAWS & PREFERENCES
      </h1>
      <p className="text-muted-foreground mb-8">
        Finding adorable cats for you...
      </p>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-primary"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
    </main>
  );
}
