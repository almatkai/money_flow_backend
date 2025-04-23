-- Migration: Triggers for Immediate Statistical Updates

-- Trigger function to update user_general_statistics after spending (daily/wish)
CREATE OR REPLACE FUNCTION update_user_general_statistics_on_spend()
RETURNS TRIGGER AS $$
BEGIN
  -- Decrease current_money and increase total_money (spent)
  UPDATE user_general_statistics
  SET
    current_money = current_money - NEW.price,
    total_money = total_money + NEW.price,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to revert user_general_statistics on DELETE
CREATE OR REPLACE FUNCTION revert_user_general_statistics_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_general_statistics
  SET
    current_money = current_money + OLD.price,
    total_money = total_money - OLD.price,
    updated_at = NOW()
  WHERE user_id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger for INSERT on daily
CREATE TRIGGER trg_update_general_stats_on_daily_insert
AFTER INSERT ON daily
FOR EACH ROW
EXECUTE FUNCTION update_user_general_statistics_on_spend();

-- Trigger for DELETE on daily
CREATE TRIGGER trg_revert_general_stats_on_daily_delete
AFTER DELETE ON daily
FOR EACH ROW
EXECUTE FUNCTION revert_user_general_statistics_on_delete();

-- Trigger for INSERT on wish
CREATE TRIGGER trg_update_general_stats_on_wish_insert
AFTER INSERT ON wish
FOR EACH ROW
EXECUTE FUNCTION update_user_general_statistics_on_spend();

-- Trigger for DELETE on wish
CREATE TRIGGER trg_revert_general_stats_on_wish_delete
AFTER DELETE ON wish
FOR EACH ROW
EXECUTE FUNCTION revert_user_general_statistics_on_delete();

-- You can add similar triggers for user_expense_statistics, user_stock_statistics, etc.
-- Example for user_expense_statistics (daily):

CREATE OR REPLACE FUNCTION update_user_expense_statistics_on_daily()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_expense_statistics
  SET
    daily_total_spent = daily_total_spent + NEW.price,
    total_spent = total_spent + NEW.price,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION revert_user_expense_statistics_on_daily_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_expense_statistics
  SET
    daily_total_spent = daily_total_spent - OLD.price,
    total_spent = total_spent - OLD.price,
    updated_at = NOW()
  WHERE user_id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_expense_stats_on_daily_insert
AFTER INSERT ON daily
FOR EACH ROW
EXECUTE FUNCTION update_user_expense_statistics_on_daily();

CREATE TRIGGER trg_revert_expense_stats_on_daily_delete
AFTER DELETE ON daily
FOR EACH ROW
EXECUTE FUNCTION revert_user_expense_statistics_on_daily_delete();

-- Repeat similar logic for wish and other relevant tables/statistics as needed.
